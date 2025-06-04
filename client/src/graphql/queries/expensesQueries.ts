import { gql } from "@apollo/client";

export const GET_EXPENSES = gql`
  query GetExpensesByTrip($tripId: ID!) {
    expensesByTrip(tripId: $tripId) {
      _id
      tripId
      userId
      fees
      food
      airfare
      lodging
      groundTransportation
      other
      total
      perPerson
      createdAt
      updatedAt
    }
  }
`;
