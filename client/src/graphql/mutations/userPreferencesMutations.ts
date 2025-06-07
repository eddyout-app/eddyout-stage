import { gql } from "@apollo/client";

export const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences(
    $userId: ID!
    $dietaryRestrictions: [String]
    $venmoHandle: String
    $phone: String
    $allergies: String
    $medicalConditions: String
    $emergencyContactName: String
    $emergencyContactPhone: String
    $medicalTraining: Boolean
    $preferredPaymentMethod: String
    $paymentHandle: String
    $avatar: String
  ) {
    updateUserPreferences(
      userId: $userId
      dietaryRestrictions: $dietaryRestrictions
      venmoHandle: $venmoHandle
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
