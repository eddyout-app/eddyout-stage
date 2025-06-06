import { gql } from "@apollo/client";

// Get all catalog items (for dropdowns)
export const GET_GEAR_CATALOG_ITEMS = gql`
  query GetGearCatalogItems {
    gearCatalogItems {
      _id
      itemName
      category
      perPersonQty
      unit
      notes
      createdAt
      updatedAt
    }
  }
`;

// Get all gear items for a trip
export const GET_GEAR_ITEMS_BY_TRIP = gql`
  query GetGearItemsByTrip($tripId: ID!) {
    gearItemsByTrip(tripId: $tripId) {
      _id
      gearItem
      quantity
      category
      userId
      tripId
      createdAt
      updatedAt
    }
  }
`;
