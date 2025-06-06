import { gql } from "@apollo/client";

// Create Gear Item (user assigns themself gear)
export const CREATE_GEAR_ITEM = gql`
  mutation CreateGearItem($input: CreateGearItemInput!) {
    createGearItem(input: $input) {
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

// Update Gear Item (user edits their assigned gear)
export const UPDATE_GEAR_ITEM = gql`
  mutation UpdateGearItem($id: ID!, $input: UpdateGearItemInput!) {
    updateGearItem(id: $id, input: $input) {
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

// Delete Gear Item (user removes their assigned gear)
export const DELETE_GEAR_ITEM = gql`
  mutation DeleteGearItem($id: ID!) {
    deleteGearItem(id: $id)
  }
`;
