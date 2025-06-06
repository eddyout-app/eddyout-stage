import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ExpenseData } from "../../types/expenses";
import {
  CREATE_EXPENSE,
  UPDATE_EXPENSE,
} from "../../graphql/mutations/expensesMutations";
import {
  GET_EXPENSES,
  GET_BALANCES_BY_TRIP,
} from "../../graphql/queries/expensesQueries";

interface ExpenseModalProps {
  expense: ExpenseData;
  userId: string;
  tripId: string;
  onClose: () => void;
  onSave: (updatedExpense: ExpenseData) => void;
}

export default function ExpenseModal({
  expense,
  userId,
  tripId,
  onClose,
  onSave,
}: ExpenseModalProps) {
  const [description, setDescription] = useState(expense.description || "");
  const [amount, setAmount] = useState(expense.amount || 0);

  const [createExpense] = useMutation(CREATE_EXPENSE);
  const [updateExpense] = useMutation(UPDATE_EXPENSE);

  const handleSave = async () => {
    try {
      let updatedExpense: ExpenseData;

      if (expense._id.startsWith("unclaimed")) {
        const result = await createExpense({
          variables: {
            input: {
              description,
              amount: parseFloat(amount.toString()),
              userId, // new field
              tripId,
            },
          },
          refetchQueries: [
            { query: GET_EXPENSES, variables: { tripId } },
            { query: GET_BALANCES_BY_TRIP, variables: { tripId } },
          ],
        });

        updatedExpense = result.data.createExpense;
      } else {
        const result = await updateExpense({
          variables: {
            id: expense._id,
            input: {
              description,
              amount: parseFloat(amount.toString()),
            },
          },
          refetchQueries: [
            { query: GET_EXPENSES, variables: { tripId } },
            { query: GET_BALANCES_BY_TRIP, variables: { tripId } },
          ],
        });

        updatedExpense = result.data.updateExpense;
      }

      onSave(updatedExpense);
      onClose();
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  const canEdit =
    (expense.userId && expense.userId === userId) ||
    expense._id.startsWith("unclaimed");

  if (!canEdit) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-header mb-4">
          {expense._id.startsWith("unclaimed") ? "Add Expense" : "Edit Expense"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {expense._id.startsWith("unclaimed")
                ? "Add Expense"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
