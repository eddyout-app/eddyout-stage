import { gql } from "@apollo/client";

export const GET_USER_PREFERENCES = gql`
  query GetUserPreferences($userId: ID!) {
    getUserPreferences(userId: $userId) {
      id
      userId
      dietaryRestrictions
      venmoHandle
      phone
      allergies
      medicalConditions
      emergencyContactName
      emergencyContactPhone
      medicalTraining
      preferredPaymentMethod
      paymentHandle
      avatar
    }
  }
`;
