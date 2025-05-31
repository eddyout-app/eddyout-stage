"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseResolvers = void 0;
const expense_js_1 = __importDefault(require("../../models/expense.js"));
const crew_js_1 = __importDefault(require("../../models/crew.js"));
exports.expenseResolvers = {
    Query: {
        expenses: async (_, { tripId }) => {
            return await expense_js_1.default.find({ tripId });
        },
        balancesByTrip: async (_, { tripId }) => {
            const expenses = await expense_js_1.default.find({ tripId });
            const totals = {};
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
        settleBalances: async (_, { tripId }) => {
            const expenses = await expense_js_1.default.find({ tripId });
            // Step 1: Calculate net balances
            const balances = {};
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
                if (Math.abs(debtors[i][1]) < 0.01)
                    i++;
                if (Math.abs(creditors[j][1]) < 0.01)
                    j++;
            }
            return settlements;
        }
    },
    Mutation: {
        createExpense: async (_, args) => {
            const { description, amount, paidBy, tripId } = args;
            // 1. Get all crew members for the trip
            const crew = await crew_js_1.default.find({ tripId });
            // 2. Extract just the user IDs
            const participants = crew.map((member) => member.userId);
            // 3. Create new expense
            const newExpense = await expense_js_1.default.create({
                description,
                amount,
                paidBy,
                participants, // ← all trip participants
                tripId,
            });
            return newExpense;
        },
        updateExpense: async (_, { id, input }, context) => {
            const userId = context?.user?.id || context?.user?._id;
            if (!userId) {
                throw new Error("Not authenticated");
            }
            const expense = await expense_js_1.default.findById(id);
            if (!expense) {
                throw new Error("Expense not found");
            }
            if (expense.paidBy.toString() !== userId.toString()) {
                throw new Error("Unauthorized: You can only update your own expenses");
            }
            const updatedExpense = await expense_js_1.default.findByIdAndUpdate(id, input, {
                new: true,
                runValidators: true,
            });
            return updatedExpense;
        },
        deleteExpense: async (_, { id }, context) => {
            const userId = context?.user?.id || context?.user?._id;
            if (!userId) {
                throw new Error("Not authenticated");
            }
            const expense = await expense_js_1.default.findById(id);
            if (!expense) {
                throw new Error("Expense not found");
            }
            if (expense.paidBy.toString() !== userId.toString()) {
                throw new Error("Unauthorized: You can only delete your own expenses");
            }
            await expense_js_1.default.findByIdAndDelete(id);
            return "Expense deleted";
        },
    },
};
