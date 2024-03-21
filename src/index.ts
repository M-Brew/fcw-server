import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth";
import clientRoutes from "./routes/client";
import revenueCollectorRoutes from "./routes/revenueCollector";
import paymentRoutes from "./routes/payment";
import invoiceRoutes from "./routes/invoice";
import { job } from "./utils/generatePaymentSchedule";

const { PORT, DB_URI } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/revenue-collectors", revenueCollectorRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/invoices", invoiceRoutes);

// job();

mongoose.connect(DB_URI);
mongoose.connection.on("open", () =>
  console.log("Connected to database successfully")
);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
