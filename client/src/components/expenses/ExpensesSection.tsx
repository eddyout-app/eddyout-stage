import { useQuery } from "@apollo/client";
import {
  GET_EXPENSES,
  GET_BALANCES_BY_TRIP,
} from "../../graphql/queries/expensesQueries";
import { ExpenseData } from "../../types/expenses";
import ExpenseModal from "./ExpenseModal";
import { useState } from "react";
import { TripData } from "../../types/trip";
import { UserData } from "../../types/user";

interface ExpensesSectionProps {
  trip: TripData;
  user: UserData;
}

export default function ExpensesSection({ trip, user }: ExpensesSectionProps) {
  const {
    data: expensesData,
    loading: expensesLoading,
    error: expensesError,
    refetch: refetchExpenses,
  } = useQuery(GET_EXPENSES, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const {
    data: balancesData,
    loading: balancesLoading,
    error: balancesError,
    refetch: refetchBalances,
  } = useQuery(GET_BALANCES_BY_TRIP, {
    variables: { tripId: trip._id },
    skip: !trip._id,
  });

  const [editExpense, setEditExpense] = useState<ExpenseData | null>(null);

  const expenses: ExpenseData[] = expensesData?.expenses || [];

  const handleAddExpense = () => {
    const newExpense: ExpenseData = {
      _id: `unclaimed-${Date.now()}`,
      description: "",
      amount: 0,
      userId: user._id,
      participants: [],
      tripId: trip._id,
      createdAt: "",
      updatedAt: "",
    };

    setEditExpense(newExpense);
  };

  if (expensesLoading || balancesLoading) {
    return (
      <div className="text-center mt-10 text-textBody font-body text-lg">
        Loading expenses...
      </div>
    );
  }

  if (expensesError || balancesError) {
    return (
      <div className="text-center mt-10 text-red-600 font-body text-lg">
        Error loading expenses:{" "}
        {expensesError?.message || balancesError?.message}
      </div>
    );
  }

  return (
    <div className="bg-light-neutral min-h-screen py-10 px-4 font-body text-textBody">
      <h1 className="text-4xl font-header text-primary mb-6 text-center">
        Trip Expenses
      </h1>

      <div className="flex justify-center mb-6">
        <button className="btn-primary" onClick={handleAddExpense}>
          Add Expense
        </button>
      </div>

      <div className="overflow-y-auto max-h-[60vh] pr-2 mx-auto">
        {/* Grid header */}
        <div className="grid grid-cols-4 gap-4 items-center text-center font-semibold mb-2 border-b border-gray-400 pb-2">
          <div>Description</div>
          <div>Amount</div>
          <div>Paid By</div>
          <div>Action</div>
        </div>

        {expenses.map((expense) => {
          const isOwner = expense.userId === user._id;

          return (
            <div
              key={expense._id}
              className="grid grid-cols-4 gap-4 items-center text-center py-2 border-b border-gray-200"
            >
              <div>{expense.description}</div>
              <div>${expense.amount.toFixed(2)}</div>
              <div>{isOwner ? "You" : expense.userId}</div>

              <div>
                <button
                  className="btn-action"
                  onClick={() => setEditExpense(expense)}
                >
                  {isOwner ? "Edit" : "View"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="text-2xl font-header text-primary mt-8 mb-4 text-center">
        Balances
      </h2>

      <div className="overflow-y-auto max-h-[30vh] pr-2 mx-auto">
        <div className="grid grid-cols-2 gap-4 text-center font-semibold mb-2 border-b border-gray-400 pb-2">
          <div>User</div>
          <div>Balance</div>
        </div>

        {balancesData?.balancesByTrip.map(
          (balance: { userId: string; balance: number }) => (
            <div
              key={balance.userId}
              className="grid grid-cols-2 gap-4 items-center text-center py-2 border-b border-gray-200"
            >
              <div>{balance.userId === user._id ? "You" : balance.userId}</div>
              <div
                className={
                  balance.balance >= 0 ? "text-green-600" : "text-red-600"
                }
              >
                ${balance.balance.toFixed(2)}
              </div>
            </div>
          )
        )}
      </div>

      {editExpense && (
        <ExpenseModal
          expense={editExpense}
          userId={user._id}
          tripId={trip._id}
          onClose={() => setEditExpense(null)}
          onSave={async (updatedExpense) => {
            console.log("Updated expense:", updatedExpense);
            await refetchExpenses();
            await refetchBalances();
            setEditExpense(null);
          }}
        />
      )}
    </div>
  );
}
