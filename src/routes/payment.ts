import { Router, Request, Response } from "express";

import { paymentValidation } from "../validation/paymentValidation";
import Payment from "../models/payment.model";
import Client from "../models/client.model";
import RevenueCollector from "../models/revenueCollector.model";
import Invoice from "../models/invoice.model";
import { checkAdminAuth } from "../middlewares/checkAuth";

const router = Router();

router.post("/", checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const { valid, errors } = paymentValidation(payload);
    if (!valid) {
      return res.status(400).json(errors);
    }

    const existingInvoice = await Invoice.findById(payload.invoice);
    if (!existingInvoice) {
      return res.status(404).json({ error: "invoice not found" });
    }

    const existingClient = await Client.findById(payload.client);
    if (!existingClient) {
      return res.status(404).json({ error: "client not found" });
    }

    const existingCollector = await RevenueCollector.findById(
      payload.revenueCollector
    );
    if (!existingCollector) {
      return res.status(404).json({ error: "revenue collector not found" });
    }

    const newPayment = new Payment({ ...payload, createdBy: req.user.id });
    await newPayment.save();

    await Invoice.findByIdAndUpdate(payload.invoice, {
      status: "paid",
      paymentDate: payload.paymentDate
    });

    await Client.findByIdAndUpdate(payload.client, {
      payments: [...existingClient.payments, newPayment._id],
    });

    await RevenueCollector.findByIdAndUpdate(payload.revenueCollector, {
      payments: [...existingCollector.payments, newPayment._id],
    });

    const payment = await Payment.findById(newPayment._id)
      .populate({ path: "revenueCollector", select: "firstName lastName" })
      .populate({ path: "client", select: "firstName lastName" })
      .populate({ path: "createdBy", select: "firstName lastName" });

    return res.status(201).json(payment);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const { client, revenueCollector } = req.query;

    const args: Record<string, string> = {};
    if (client) {
      args.client = client.toString();
    }
    if (revenueCollector) {
      args.revenueCollector = revenueCollector.toString();
    }

    const payments = await Payment.find(args)
      .populate({ path: "revenueCollector", select: "firstName lastName" })
      .populate({ path: "client", select: "firstName lastName" })
      .populate({ path: "createdBy", select: "firstName lastName" });

    return res.status(200).json(payments);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id)
      .populate({ path: "revenueCollector", select: "firstName lastName" })
      .populate({ path: "client", select: "firstName lastName" })
      .populate({ path: "createdBy", select: "firstName lastName" });

    if (!payment) {
      return res.status(404).json({ error: "payment not found" });
    }

    return res.status(200).json(payment);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ error: "payment not found" });
    }

    await Payment.findByIdAndUpdate(id, payload, {
      new: true,
      useFindAndModify: false,
    });

    const updatedPayment = await Payment.findById(id)
      .populate({ path: "revenueCollector", select: "firstName lastName" })
      .populate({ path: "client", select: "firstName lastName" })
      .populate({ path: "createdBy", select: "firstName lastName" });

    return res.status(200).json(updatedPayment);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ error: "payment not found" });
    }

    await Payment.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

export default router;
