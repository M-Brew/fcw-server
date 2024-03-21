import { IClient } from "interfaces";

const clientValidation = (
  client: IClient
): { valid: boolean; errors: Record<string, string> } => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    area,
    street,
    houseNumber,
    type,
    code,
    numberOfBins,
  } = client;
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

  if (!area || area.trim() === "") {
    errors.area = "area is required";
  }

  if (!street || street.trim() === "") {
    errors.street = "street is required";
  }

  if (!houseNumber || houseNumber.trim() === "") {
    errors.houseNumber = "house number is required";
  }

  if (!type || type.trim() === "") {
    errors.type = "type is required";
  }

  if (!code) {
    errors.code = "code is required";
  } else {
    if (!parseInt(code.toString())) {
      errors.code = "code should be a valid number";
    }
  }

  if (!numberOfBins) {
    errors.numberOfBins = "numberOfBins is required";
  } else {
    if (!parseInt(numberOfBins.toString())) {
      errors.numberOfBins = "numberOfBins should be a valid number";
    }
  }

  return {
    valid: Object.keys(errors).length < 1,
    errors,
  };
};

export { clientValidation };
