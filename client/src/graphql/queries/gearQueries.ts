// src/graphql/gear.ts
import { gql } from "@apollo/client";

// Query: get all gear items for a trip
export const GET_GEAR_ITEMS_BY_TRIP = gql`
  query GearItemsByTrip($tripId: ID!) {
    gearItemsByTrip(tripId: $tripId) {
      _id
      gearItem
      quantity
      category
      claimedBy
      tripId
      gearListId
      createdAt
      updatedAt
    }
  }
`;
