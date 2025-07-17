import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
