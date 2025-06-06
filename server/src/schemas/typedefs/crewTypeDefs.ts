import { gql } from "graphql-tag";

const crewTypeDefs = gql`
  type Crew {
    _id: ID!
    tripId: ID!
    role: String!
    userId: ID!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    crewByTrip(tripId: ID!): [Crew!]!
  }

  extend type Mutation {
    assignCrewMember(crewId: ID!, userId: ID!, role: String!): Crew!
    updateCrewMember(crewId: ID!, userId: ID!, role: String!): Crew!
    assignOrUpdateCrewMember(crewId: ID!, userId: ID!, role: String!): Crew!
  }
`;

export default crewTypeDefs;
