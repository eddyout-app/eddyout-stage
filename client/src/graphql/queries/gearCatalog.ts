import { gql } from "@apollo/client";

// Query: get all catalog items
export const GET_GEAR_CATALOG_ITEMS = gql`
  query GetGearCatalogItems {
    gearCatalogItems {
      _id
      itemName
      category
      perPersonQty
      unit
      notes
    }
  }
`;
