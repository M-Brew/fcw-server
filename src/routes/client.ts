import { Router, Request, Response } from "express";

import { clientValidation } from "../validation/clientValidation";
import Client from "../models/client.model";
import { checkAdminAuth } from "../middlewares/checkAuth";

const router = Router();

router.post("/", checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const { valid, errors } = clientValidation(payload);
    if (!valid) {
      return res.status(400).json(errors);
    }

    const newClient = new Client({ ...payload, createdBy: req.user.id });
    const client = await newClient.save();

    return res.status(201).json(client);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();

    return res.status(200).json(clients);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ error: "client not found" });
    }

    return res.status(200).json(client);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.patch("/:id", checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ error: "client not found" });
    }

    const updatedClient = await Client.findByIdAndUpdate(id, payload, {
      new: true,
      useFindAndModify: false,
    });

    return res.status(200).json(updatedClient);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

router.patch(
  "/suspend/:id",
  checkAdminAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const client = await Client.findById(id);
      if (!client) {
        return res.status(404).json({ error: "client not found" });
      }

      const updatedClient = await Client.findByIdAndUpdate(
        id,
        { suspended: true },
        {
          new: true,
          useFindAndModify: false,
        }
      );

      return res.status(200).json(updatedClient);
    } catch (error) {
      res.sendStatus(500);
      throw new Error(error);
    }
  }
);

router.patch(
  "/restore/:id",
  checkAdminAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const client = await Client.findById(id);
      if (!client) {
        return res.status(404).json({ error: "client not found" });
      }

      const updatedClient = await Client.findByIdAndUpdate(
        id,
        { suspended: false },
        {
          new: true,
          useFindAndModify: false,
        }
      );

      return res.status(200).json(updatedClient);
    } catch (error) {
      res.sendStatus(500);
      throw new Error(error);
    }
  }
);

router.delete("/:id", checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ error: "client not found" });
    }

    await Client.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
    throw new Error(error);
  }
});

export default router;
