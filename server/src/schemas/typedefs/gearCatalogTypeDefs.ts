import { gql } from "graphql-tag";

export const gearCatalogTypeDefs = gql`
  type GearCatalogItem {
    _id: ID!
    itemName: String!
    category: String!
    perPersonQty: Float
    unit: String
    notes: String
    createdAt: String
    updatedAt: String
  }

  input CreateGearCatalogItemInput {
    itemName: String!
    category: String
    perPersonQty: Float
    unit: String
    notes: String
  }

  type Query {
    gearCatalogItems: [GearCatalogItem!]!
  }

  type Mutation {
    createGearCatalogItem(input: CreateGearCatalogItemInput!): GearCatalogItem
    deleteGearCatalogItem(id: ID!): String
  }
`;
