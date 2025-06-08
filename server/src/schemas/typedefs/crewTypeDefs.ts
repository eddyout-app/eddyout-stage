import { gql } from "graphql-tag";

const crewTypeDefs = gql`
  type Crew {
    _id: ID!
    tripId: ID!
    userId: User!
    role: String
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    crewByTrip(tripId: ID!): [Crew!]!
  }

  extend type Mutation {
    addCrewMember(tripId: ID!, userId: ID!, role: String): Crew!
    updateCrewMember(crewId: ID!, role: String!): Crew!
    removeCrewMember(crewMemberId: ID!): Boolean!
  }
`;

export default crewTypeDefs;
