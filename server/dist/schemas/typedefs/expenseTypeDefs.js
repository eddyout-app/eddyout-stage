"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.expenseTypeDefs = (0, graphql_tag_1.gql) `
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
