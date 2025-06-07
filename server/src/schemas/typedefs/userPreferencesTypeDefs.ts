// userPreferencesTypeDefs.ts

import { gql } from "graphql-tag";

const userPreferencesTypeDefs = gql`
  type UserPreferences {
    id: ID!
    dietaryRestrictions: [String]
    venmoHandle: String
    phone: String
    allergies: String
    medicalConditions: String
    emergencyContactName: String
    emergencyContactPhone: String
    medicalTraining: Boolean
    preferredPaymentMethod: String
    paymentHandle: String
    avatar: String
  }

  type Query {
    getUserPreferences(userId: ID!): UserPreferences
  }

  type Mutation {
    updateUserPreferences(
      userId: ID!
      dietaryRestrictions: [String]
      venmoHandle: String
      phone: String
      allergies: String
      medicalConditions: String
      emergencyContactName: String
      emergencyContactPhone: String
      medicalTraining: Boolean
      preferredPaymentMethod: String
      paymentHandle: String
      avatar: String
    ): UserPreferences
  }
`;

export default userPreferencesTypeDefs;
