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
        const userId = expense.userId.toString(); // was paidBy
        const share = expense.amount / expense.participants.length;

        totalSpent += expense.amount;

        for (const participant of expense.participants) {
          const participantId = participant.toString();
          totals[participantId] = (totals[participantId] || 0) - share;
        }

        totals[userId] = (totals[userId] || 0) + expense.amount;
      }

      return Object.entries(totals).map(([userId, balance]) => ({
        userId,
        balance,
      }));
    },

    settleBalances: async (_: any, { tripId }: { tripId: string }) => {
      const expenses = await Expense.find({ tripId });

      const balances: Record<string, number> = {};

      for (const expense of expenses) {
        const share = expense.amount / expense.participants.length;

        for (const participant of expense.participants) {
          const participantId = participant.toString();
          balances[participantId] = (balances[participantId] || 0) - share;
        }

        balances[expense.userId.toString()] =
          (balances[expense.userId.toString()] || 0) + expense.amount;
      }

      const creditors = Object.entries(balances)
        .filter(([_, amt]) => amt > 0)
        .sort((a, b) => b[1] - a[1]);

      const debtors = Object.entries(balances)
        .filter(([_, amt]) => amt < 0)
        .sort((a, b) => a[1] - b[1]);

      const settlements = [];

      let i = 0,
        j = 0;
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
    },
  },

  Mutation: {
    createExpense: async (
      _: any,
      {
        input,
      }: {
        input: {
          description: string;
          amount: number;
          tripId: string;
          userId: string;
        };
      }
    ) => {
      const { description, amount, tripId, userId } = input;

      const crew = await Crew.find({ tripId });
      const participants = crew.map((member) => member.userId);

      const newExpense = await Expense.create({
        description,
        amount,
        userId, // was paidBy
        participants,
        tripId,
      });

      return newExpense;
    },

    updateExpense: async (
      _: any,
      {
        id,
        input,
      }: { id: string; input: { description?: string; amount?: number } }
    ) => {
      const expense = await Expense.findById(id);

      if (!expense) {
        throw new Error("Expense not found");
      }

      // NOTE: Optional → if you want to remove this check to avoid auth logic:
      // if (expense.userId.toString() !== userId.toString()) { ... } → can be removed if you want!

      const updatedExpense = await Expense.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });

      return updatedExpense;
    },

    deleteExpense: async (_: any, { id }: { id: string }) => {
      const expense = await Expense.findById(id);
      if (!expense) {
        throw new Error("Expense not found");
      }

      // Optional: remove auth check here if not needed!

      await Expense.findByIdAndDelete(id);
      return "Expense deleted";
    },
  },
};
