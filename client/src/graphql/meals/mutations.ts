// graphql/meals/mutations.ts

import { gql } from "@apollo/client";

export const CLAIM_MEAL = gql`
  mutation ClaimMeal($mealId: ID!, $userId: ID!, $mealName: String!) {
    claimMeal(mealId: $mealId, userId: $userId, mealName: $mealName) {
      _id
      mealType
      mealName
      tripId
      date
      userId {
        _id
        fullName
      }
    }
  }
`;

export const UPDATE_MEAL = gql`
  mutation UpdateMeal($mealId: ID!, $userId: ID!, $mealName: String!) {
    updateMeal(mealId: $mealId, userId: $userId, mealName: $mealName) {
      _id
      mealType
      mealName
      tripId
      date
      userId {
        _id
        fullName
      }
    }
  }
`;

export const CLAIM_OR_UPDATE_MEAL = gql`
  mutation ClaimOrUpdateMeal($mealId: ID!, $userId: ID!, $mealName: String!) {
    claimOrUpdateMeal(mealId: $mealId, userId: $userId, mealName: $mealName) {
      _id
      mealType
      mealName
      tripId
      date
      userId {
        _id
        fullName
      }
    }
  }
`;
