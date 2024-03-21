import { model, Schema } from "mongoose";

const clientSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    area: String,
    street: String,
    houseNumber: String,
    type: String,
    code: String,
    numberOfBins: Number,
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

const clientModel = model("Client", clientSchema);

export default clientModel;
