import { gql } from "graphql-tag";

const userPreferencesTypeDefs = gql`
  type UserPreferences {
    _id: ID!
    dietaryRestrictions: [String]
    phone: String
    allergies: String
    medicalConditions: String
    emergencyContactName: String
    emergencyContactPhone: String
    medicalTraining: String
    preferredPaymentMethod: String
    paymentHandle: String
    avatar: String
  }

  type Query {
    getUserPreferences(_id: ID!): UserPreferences
  }

  type Mutation {
    updateUserPreferences(
      id: ID!
      dietaryRestrictions: [String]
      phone: String
      allergies: String
      medicalConditions: String
      emergencyContactName: String
      emergencyContactPhone: String
      medicalTraining: String
      preferredPaymentMethod: String
      paymentHandle: String
      avatar: String
    ): UserPreferences
  }
`;

export default userPreferencesTypeDefs;
