import { gql } from "graphql-tag";

export const expenseTypeDefs = gql`
  type Expense {
    _id: ID!
    description: String!
    amount: Float!
    paidBy: ID!
    participants: [ID!]!
    tripId: ID!
    createdAt: String
    updatedAt: String
  }

  input CreateExpenseInput {
    description: String!
    amount: Float!
    paidBy: ID!
    tripId: ID!
  }

  type Query {
    expenses(tripId: ID!): [Expense!]!
  }

  type Mutation {
    createExpense(input: CreateExpenseInput!): Expense
  }
`;
