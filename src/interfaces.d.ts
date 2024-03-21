export interface IClient {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  area: string;
  street: string;
  houseNumber: string;
  type: string;
  code: number;
  numberOfBins: number;
}

export interface IRevenueCollector {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}

export interface IPayment {
  invoice: string;
  amount: number;
  receiptNumber: number;
  revenueCollector: string;
  client: string;
  paymentDate: string;
  remarks: string;
}
