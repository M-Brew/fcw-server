import { model, Schema } from "mongoose";

const revenueCollectorSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    payments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const revenueCollectorModel = model("RevenueCollector", revenueCollectorSchema);

export default revenueCollectorModel;
