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

import "../../styles/sections.css";

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
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading expenses...
      </p>
    );
  }

  if (expensesError || balancesError) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        Error loading expenses:{" "}
        {expensesError?.message || balancesError?.message}
      </p>
    );
  }

  return (
    <div className="section-container">
      <h1>Trip Expenses</h1>

      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <button className="btn-primary" onClick={handleAddExpense}>
          Add Expense
        </button>
      </div>

      <div className="planner-grid">
        <div className="planner-grid-header">
          <div>Description</div>
          <div>Amount</div>
          <div>Paid By</div>
          <div>Action</div>
        </div>

        {expenses.map((expense) => {
          const isOwner = expense.userId === user._id;

          return (
            <div key={expense._id} className="planner-grid-row">
              <div>{expense.description}</div>
              <div>${expense.amount.toFixed(2)}</div>
              <div>{isOwner ? "You" : expense.userId}</div>

              <div>
                <div
                  className="inline-action"
                  onClick={() => setEditExpense(expense)}
                >
                  {isOwner ? "Edit" : "View"} <span className="arrow">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2
        style={{ textAlign: "center", marginTop: "2rem", marginBottom: "1rem" }}
      >
        Balances
      </h2>

      <div className="planner-grid">
        <div
          className="planner-grid-header"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div>User</div>
          <div>Balance</div>
        </div>

        {balancesData?.balancesByTrip.map(
          (balance: { userId: string; balance: number }) => (
            <div
              key={balance.userId}
              className="planner-grid-row"
              style={{ gridTemplateColumns: "1fr 1fr" }}
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
