import { Router, Request, Response } from "express";

import Invoice from "../models/invoice.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { client, status } = req.query;

    const args: Record<string, string> = {};
    if (client) {
      args.client = client.toString();
    }
    if (status) {
      args.status = status.toString();
    }

    const invoices = await Invoice.find(args).populate({
      path: "client",
      select: "firstName lastName",
    });

    return res.status(200).json(invoices);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id).populate({
      path: "client",
      select: "firstName lastName",
    });

    if (!invoice) {
      return res.status(404).json({ error: "payment not found" });
    }

    return res.status(200).json(invoice);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ error: "invoice not found" });
    }

    await Invoice.findByIdAndUpdate(id, payload, {
      new: true,
      useFindAndModify: false,
    });

    const updatedInvoice = await Invoice.findById(id).populate({
      path: "client",
      select: "firstName lastName",
    });

    return res.status(200).json(updatedInvoice);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

export default router;
