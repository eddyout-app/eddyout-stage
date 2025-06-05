import { gql } from "@apollo/client";

// Mutation: create new gear item
export const CREATE_GEAR_ITEM = gql`
  mutation CreateGearItem($input: CreateGearItemInput!) {
    createGearItem(input: $input) {
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

// Mutation: delete gear item
export const DELETE_GEAR_ITEM = gql`
  mutation DeleteGearItem($id: ID!) {
    deleteGearItem(id: $id)
  }
`;
