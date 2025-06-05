import { useState } from "react";
import { ExpenseData } from "../../types/expenses";

interface ExpensesModalProps {
  expense: ExpenseData;
  userId: string;
  onClose: () => void;
  onSave: (updatedExpense: ExpenseData) => void;
}

export default function ExpensesModal({
  expense,
  userId,
  onClose,
  onSave,
}: ExpensesModalProps) {
  const [total, setTotal] = useState(expense.total ?? 0);

  const handleSave = () => {
    const updatedExpense: ExpenseData = {
      ...expense,
      userId,
      total,
    };

    onSave(updatedExpense);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-xl font-header mb-4">Edit Expense</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Total Amount ($)</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
