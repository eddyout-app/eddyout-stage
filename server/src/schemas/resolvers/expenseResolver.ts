import Expense from "../../models/expense.js";
import Crew from "../../models/crew.js";

export const expenseResolvers = {
    Query: {
        expenses: async (_: any, { tripId }: { tripId: string }) => {
            return await Expense.find({ tripId });
        },
        balancesByTrip: async (_: any, { tripId }: { tripId: string }) => {
            const expenses = await Expense.find({ tripId });

            const totals: Record<string, number> = {};
            let totalSpent = 0;

            for (const expense of expenses) {
                const paidBy = expense.paidBy.toString();
                const share = expense.amount / expense.participants.length;

                totalSpent += expense.amount;

                // Each participant owes a share
                for (const userId of expense.participants) {
                    const participantId = userId.toString();
                    totals[participantId] = (totals[participantId] || 0) - share;
                }

                // The payer gets the full amount credited back
                totals[paidBy] = (totals[paidBy] || 0) + expense.amount;
            }

            // Return list of balances by user
            return Object.entries(totals).map(([userId, balance]) => ({
                userId,
                balance,
            }));
        },

        settleBalances: async (_: any, { tripId }: { tripId: string }) => {
            const expenses = await Expense.find({ tripId });

            // Step 1: Calculate net balances
            const balances: Record<string, number> = {};

            for (const expense of expenses) {
                const share = expense.amount / expense.participants.length;

                for (const participant of expense.participants) {
                    const participantId = participant.toString();
                    balances[participantId] = (balances[participantId] || 0) - share;
                }

                balances[expense.paidBy.toString()] = (balances[expense.paidBy.toString()] || 0) + expense.amount;
            }

            // Step 2: Split into creditors and debtors
            const creditors = Object.entries(balances)
                .filter(([_, amt]) => amt > 0)
                .sort((a, b) => b[1] - a[1]);

            const debtors = Object.entries(balances)
                .filter(([_, amt]) => amt < 0)
                .sort((a, b) => a[1] - b[1]);

            // Step 3: Generate settlements
            const settlements = [];

            let i = 0, j = 0;
            while (i < debtors.length && j < creditors.length) {
                const [debtorId, debtorAmt] = debtors[i];
                const [creditorId, creditorAmt] = creditors[j];

                const payment = Math.min(-debtorAmt, creditorAmt);

                settlements.push({
                    from: debtorId,
                    to: creditorId,
                    amount: parseFloat(payment.toFixed(2)),
                });

                debtors[i][1] += payment;
                creditors[j][1] -= payment;

                if (Math.abs(debtors[i][1]) < 0.01) i++;
                if (Math.abs(creditors[j][1]) < 0.01) j++;
            }

            return settlements;
        }

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

        updateExpense: async (
            _: any,
            { id, input }: { id: string; input: { description?: string; amount?: number } },
            context: any
        ) => {
            const userId = context?.user?.id || context?.user?._id;

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

            const updatedExpense = await Expense.findByIdAndUpdate(id, input, {
                new: true,
                runValidators: true,
            });

            return updatedExpense;
        },

        deleteExpense: async (_: any, { id }: { id: string }, context: any) => {
            const userId = context?.user?.id || context?.user?._id;

            if (!userId) {
                throw new Error("Not authenticated");
            }

            const expense = await Expense.findById(id);
            if (!expense) {
                throw new Error("Expense not found");
            }

            if (expense.paidBy.toString() !== userId.toString()) {
                throw new Error("Unauthorized: You can only delete your own expenses");
            }

            await Expense.findByIdAndDelete(id);
            return "Expense deleted";
        },
    },
};
