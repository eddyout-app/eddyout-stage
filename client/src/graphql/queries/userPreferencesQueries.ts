import { gql } from "@apollo/client";

export const GET_USER_PREFERENCES = gql`
  query GetUserPreferences($_id: ID!) {
    getUserPreferences(_id: $_id) {
      dietaryRestrictions
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
