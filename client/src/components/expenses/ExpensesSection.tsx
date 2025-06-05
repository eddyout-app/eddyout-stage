import { useQuery } from "@apollo/client";
import { GET_EXPENSES } from "../../graphql/queries/expensesQueries";
import { ExpenseData } from "../../types/expenses";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";
import ExpensesModal from "./ExpensesModal";
import { useState } from "react";

interface ExpensesSectionProps {
  trip: TripData;
  user: UserData;
}

export default function ExpensesSection({ trip, user }: ExpensesSectionProps) {
  const { data, loading, error } = useQuery(GET_EXPENSES, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const [editExpense, setEditExpense] = useState<ExpenseData | null>(null);

  const expenses: ExpenseData[] = data?.expensesByTrip || [];

  if (loading) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading expenses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 font-body text-lg">
        Error loading expenses.
      </div>
    );
  }

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Expenses for {trip.riverName}
      </h1>

      <ul className="space-y-3">
        {expenses.map((expense) => (
          <li
            key={expense._id}
            className="border p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">User ID: {expense.userId}</p>
              <p>Total: ${expense.total?.toFixed(2) ?? "—"}</p>
            </div>
            <button
              className="btn-action"
              onClick={() => setEditExpense(expense)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {editExpense && (
        <ExpensesModal
          expense={editExpense}
          userId={user._id}
          onClose={() => setEditExpense(null)}
          onSave={(updatedExpense) => {
            console.log("Updated expense:", updatedExpense);
            setEditExpense(null);
          }}
        />
      )}
    </div>
  );
}
