import { gql } from "@apollo/client";

export const CREATE_EXPENSE = gql`
  mutation CreateExpense($input: CreateExpenseInput!) {
    createExpense(input: $input) {
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

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($id: ID!, $input: UpdateExpenseInput!) {
    updateExpense(id: $id, input: $input) {
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

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: ID!) {
    deleteExpense(id: $id)
  }
`;
