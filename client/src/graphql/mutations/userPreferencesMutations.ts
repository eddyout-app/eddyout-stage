import { gql } from "@apollo/client";

export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences(
    $id: ID!
    $dietaryRestrictions: [String]
    $phone: String
    $allergies: String
    $medicalConditions: String
    $emergencyContactName: String
    $emergencyContactPhone: String
    $medicalTraining: String
    $preferredPaymentMethod: String
    $paymentHandle: String
    $avatar: String
  ) {
    updateUserPreferences(
      id: $id
      dietaryRestrictions: $dietaryRestrictions
      phone: $phone
      allergies: $allergies
      medicalConditions: $medicalConditions
      emergencyContactName: $emergencyContactName
      emergencyContactPhone: $emergencyContactPhone
      medicalTraining: $medicalTraining
      preferredPaymentMethod: $preferredPaymentMethod
      paymentHandle: $paymentHandle
      avatar: $avatar
    ) {
      _id
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
