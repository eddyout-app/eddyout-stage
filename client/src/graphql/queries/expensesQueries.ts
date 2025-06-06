import { gql } from "@apollo/client";

export const GET_EXPENSES = gql`
  query GetExpenses($tripId: ID!) {
    expenses(tripId: $tripId) {
      _id
      description
      amount
      userId # was paidBy
      participants
      tripId
      createdAt
      updatedAt
    }
  }
`;

export const GET_BALANCES_BY_TRIP = gql`
  query GetBalancesByTrip($tripId: ID!) {
    balancesByTrip(tripId: $tripId) {
      userId
      balance
    }
  }
`;

export const GET_SETTLEMENTS = gql`
  query SettleBalances($tripId: ID!) {
    settleBalances(tripId: $tripId) {
      from
      to
      amount
    }
  }
`;
