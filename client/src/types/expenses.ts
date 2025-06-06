export type ExpenseData = {
  _id: string;
  description: string;
  amount: number;
  userId: string; // ObjectId as string → was paidBy
  participants: string[]; // Array of ObjectIds as strings
  tripId: string; // ObjectId as string
  createdAt: string;
  updatedAt: string;
};
