import { gql } from "graphql-tag";

const userPreferencesTypeDefs = gql`
  # The UserPreferences type
  type UserPreferences {
    id: ID!
    dietaryRestrictions: [String] # Array of strings for multiple dietary restrictions
    venmoHandle: String
  }

  # The root Query type
  type Query {
    getUserPreferences(userId: ID!): UserPreferences
  }

  # The root Mutation type
  type Mutation {
    updateUserPreferences(
      userId: ID!
      dietaryRestrictions: [String]
      venmoHandle: String
    ): UserPreferences
  }
`;

export default userPreferencesTypeDefs;
