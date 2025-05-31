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

        updateExpense: async (_: any, { id, ...updates }: any) => {
            try {
                const updatedExpense = await Expense.findByIdAndUpdate(id, updates, {
                    new: true,
                    runValidators: true,
                });

                if (!updatedExpense) {
                    throw new Error("Expense not found");
                }

                return updatedExpense;
            } catch (error) {
                throw new Error(`Failed to update expense: ${error.message}`);
            }
        },

        deleteExpense: async (_: any, { id }: { id: string }) => {
            await Expense.findByIdAndDelete(id);
            return "Expense deleted";
        },
    },
};
