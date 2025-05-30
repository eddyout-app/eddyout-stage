export type ExpenseData = {
  _id: string;
  tripId: string;
  userId: string;
  fees?: number;
  food?: number;
  airfare?: number;
  lodging?: number;
  groundTransportation?: number;
  other?: number;
  total?: number;
  perPerson?: number;
  createdAt: string;
  updatedAt: string;
};
