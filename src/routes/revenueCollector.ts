import { Router, Request, Response } from "express";

import { revenueCollectorValidation } from "../validation/revenueCollectorValidation";
import RevenueCollector from "../models/revenueCollector.model";
import { checkAdminAuth } from "../middlewares/checkAuth";

const router = Router();

router.post("/", checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const { valid, errors } = revenueCollectorValidation(payload);
    if (!valid) {
      return res.status(400).json(errors);
    }

    const newCollector = new RevenueCollector({
      ...payload,
      createdBy: req.user.id,
    });
    const collector = await newCollector.save();

    return res.status(201).json(collector);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const collectors = await RevenueCollector.find();

    return res.status(200).json(collectors);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const collector = await RevenueCollector.findById(id);
    if (!collector) {
      return res.status(404).json({ error: "collector not found" });
    }

    return res.status(200).json(collector);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.patch("/:id", checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const collector = await RevenueCollector.findById(id);
    if (!collector) {
      return res.status(404).json({ error: "collector not found" });
    }

    const updatedCollector = await RevenueCollector.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    return res.status(200).json(updatedCollector);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.patch("/suspend/:id", checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const collector = await RevenueCollector.findById(id);
    if (!collector) {
      return res.status(404).json({ error: "collector not found" });
    }

    const updatedCollector = await RevenueCollector.findByIdAndUpdate(
      id,
      { suspended: true },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    return res.status(200).json(updatedCollector);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.patch("/restore/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const collector = await RevenueCollector.findById(id);
    if (!collector) {
      return res.status(404).json({ error: "collector not found" });
    }

    const updatedCollector = await RevenueCollector.findByIdAndUpdate(
      id,
      { suspended: false },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    return res.status(200).json(updatedCollector);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const collector = await RevenueCollector.findById(id);
    if (!collector) {
      return res.status(404).json({ error: "collector not found" });
    }

    await RevenueCollector.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

export default router;
