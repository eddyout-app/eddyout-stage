import Expense from "../../models/expense.js";
import Crew from "../../models/crew.js";

export const expenseResolvers = {
    Query: {
        expensesByTrip: async (_: any, { tripId }: { tripId: string }) => {
            return await Expense.find({ tripId });
        },
    },

    Mutation: {
        createExpense: async (
            _: any,
            args: { description: string; amount: number; paidBy: string; tripId: string }
        ) => {
            const { description, amount, paidBy, tripId } = args;

            // 1. Get all crew members for the trip
            const crew = await Crew.find({ tripId });

            // 2. Extract just the user IDs
            const participants = crew.map((member) => member.userId);

            // 3. Create new expense
            const newExpense = await Expense.create({
                description,
                amount,
                paidBy,
                participants, // ← all trip participants
                tripId,
            });

            return newExpense;
        },

        updateExpense: async (_: any, { id, ...updates }: any, context: any) => {
            const userId = context?.user?.id || context?.user?._id; // Adjust as needed

            if (!userId) {
                throw new Error("Not authenticated");
            }

            const expense = await Expense.findById(id);

            if (!expense) {
                throw new Error("Expense not found");
            }

            if (expense.paidBy.toString() !== userId.toString()) {
                throw new Error("Unauthorized: You can only update your own expenses");
            }

            const updatedExpense = await Expense.findByIdAndUpdate(id, updates, {
                new: true,
                runValidators: true,
            });

            return updatedExpense;
        },

        deleteExpense: async (_: any, { id }: { id: string }) => {
            await Expense.findByIdAndDelete(id);
            return "Expense deleted";
        },
    },
};
