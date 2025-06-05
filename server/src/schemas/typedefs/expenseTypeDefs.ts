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

  input UpdateExpenseInput {
    description: String
    amount: Float
  }

  type Balance {
    userId: ID!
    balance: Float!
  }

  type Settlement {
    from: ID!
    to: ID!
    amount: Float!
  }

  extend type Query {
    expenses(tripId: ID!): [Expense!]!
    balancesByTrip(tripId: ID!): [Balance!]!
    settleBalances(tripId: ID!): [Settlement!]!
  }

  extend type Mutation {
    createExpense(input: CreateExpenseInput!): Expense
    updateExpense(id: ID!, input: UpdateExpenseInput!): Expense
    deleteExpense(id: ID!): String
  }
`;
