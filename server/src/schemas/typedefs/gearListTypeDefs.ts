import { gql } from "graphql-tag";

export const gearListTypeDefs = gql`
  type GearList {
    _id: ID!
    tripId: ID!
    category: String!
    description: String
    createdAt: String
    updatedAt: String
  }

  input CreateGearListInput {
    tripId: ID!
    category: String!
    description: String
  }

  type Query {
    gearListsByTrip(tripId: ID!): [GearList!]!
  }

  type Mutation {
    createGearList(input: CreateGearListInput!): GearList
    deleteGearList(id: ID!): String
  }
`;
