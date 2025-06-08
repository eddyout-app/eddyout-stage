import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    firstName: String!
    lastName: String!
    role: String!
    userDetails: UserPreferences
    createdAt: String!
    updatedAt: String!
    fullName: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    users: [User!]!
    user(_id: ID!): User
    me: User
  }

  extend type Mutation {
    registerUser(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      role: String
    ): AuthPayload!

    login(email: String!, password: String!): AuthPayload!
    requestPasswordReset(email: String!): Boolean!
    resetPassword(token: String!, newPassword: String!): Boolean!
  }
`;
