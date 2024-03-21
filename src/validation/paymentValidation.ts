import mongoose from "mongoose";
import { IPayment } from "interfaces";

const paymentValidation = (
  payment: IPayment
): { valid: boolean; errors: Record<string, string> } => {
  const {
    invoice,
    amount,
    receiptNumber,
    revenueCollector,
    client,
    paymentDate,
    remarks,
  } = payment;
  const errors: Record<string, string> = {};

  if (!invoice || invoice.trim() === "") {
    errors.invoice = "invoice is required";
  } else {
    if (!mongoose.isValidObjectId(invoice)) {
      errors.revenueCollector = "invoice must be a valid id";
    }
  }

  if (!amount) {
    errors.amount = "amount is required";
  } else {
    if (!parseFloat(amount.toString())) {
      errors.amount = "amount must be a valid number";
    }
  }

  if (!receiptNumber) {
    errors.receiptNumber = "receipt number is required";
  } else {
    if (!parseFloat(receiptNumber.toString())) {
      errors.receiptNumber = "receipt number must be a valid number";
    }
  }

  if (!revenueCollector || revenueCollector.trim() === "") {
    errors.revenueCollector = "revenue collector is required";
  } else {
    if (!mongoose.isValidObjectId(revenueCollector)) {
      errors.revenueCollector = "revenue collector must be a valid id";
    }
  }

  if (!client || client.trim() === "") {
    errors.client = "client is required";
  } else {
    if (!mongoose.isValidObjectId(client)) {
      errors.client = "client must be a valid id";
    }
  }

  if (!paymentDate || paymentDate.trim() === "") {
    errors.paymentDate = "payment date is required";
  }

  if (!remarks || remarks.trim() === "") {
    errors.remarks = "remarks is required";
  }

  return {
    valid: Object.keys(errors).length < 1,
    errors,
  };
};

export { paymentValidation };
