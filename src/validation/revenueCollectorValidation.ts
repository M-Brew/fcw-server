import { IRevenueCollector } from "interfaces";

const revenueCollectorValidation = (
  revenueCollector: IRevenueCollector
): { valid: boolean; errors: Record<string, string> } => {
  const { firstName, lastName, email, phoneNumber } = revenueCollector;
  const errors: Record<string, string> = {};

  if (!firstName || firstName.trim() === "") {
    errors.firstName = "first name is required";
  }

  if (!lastName || lastName.trim() === "") {
    errors.lastName = "last name is required";
  }

  if (!email || email.trim() === "") {
    errors.email = "email is required";
  }

  if (!phoneNumber || phoneNumber.trim() === "") {
    errors.phoneNumber = "phone number is required";
  }

  return {
    valid: Object.keys(errors).length < 1,
    errors,
  };
};

export { revenueCollectorValidation };
