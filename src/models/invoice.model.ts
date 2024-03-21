import { model, Schema } from "mongoose";

const invoiceSchema = new Schema(
  {
    amount: Number,
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    status: {
      type: String,
      default: "unpaid"
    },
    dueDate: String,
    paymentDate: String,
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const invoiceModel = model("Invoice", invoiceSchema);

export default invoiceModel;
