import { gql } from "@apollo/client";

export const GET_MEALS_BY_TRIP = gql`
  query GetMealsByTrip($tripId: ID!) {
    mealsByTrip(tripId: $tripId) {
      _id
      mealType
      mealName
      date
      tripId
      userId
    }
  }
`;
