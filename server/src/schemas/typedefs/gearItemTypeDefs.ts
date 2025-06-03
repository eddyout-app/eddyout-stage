import { gql } from "graphql-tag";

export const gearItemTypeDefs = gql`
  type GearItem {
    _id: ID!
    gearItem: String!
    quantity: Int!
    claimedBy: ID
    category: String!
    tripId: ID!
    createdAt: String
    updatedAt: String
  }

  input CreateGearItemInput {
    gearItem: String!
    quantity: Int!
    category: String!
    tripId: ID!
  }

  input UpdateGearItemInput {
    gearItem: String
    quantity: Int
    claimedBy: ID
    category: String
  }

  type Query {
    gearItems(tripId: ID!): [GearItem!]!
  }

  type Mutation {
    createGearItem(input: CreateGearItemInput!): GearItem
    updateGearItem(id: ID!, input: UpdateGearItemInput!): GearItem
    deleteGearItem(id: ID!): String
  }
`;
