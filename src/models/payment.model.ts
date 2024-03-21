import { model, Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    invoice: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
    },
    amount: Number,
    receiptNumber: Number,
    revenueCollector: {
      type: Schema.Types.ObjectId,
      ref: "RevenueCollector",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    paymentDate: String,
    remarks: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const paymentModel = model("Payment", paymentSchema);

export default paymentModel;
