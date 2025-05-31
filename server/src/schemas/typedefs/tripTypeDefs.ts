import { gql } from "graphql-tag";

const tripTypeDefs = gql`
  type Trip {
    _id: ID!
    riverName: String!
    startDate: String!
    endDate: String!
    putIn: String!
    takeOut: String!
    crewNum: Int!
    organizerId: ID!
  }

  extend type Query {
    trips: [Trip]
    trip(id: ID!): Trip
  }

  extend type Mutation {
    createTrip(
      riverName: String!
      startDate: String!
      endDate: String!
      putIn: String!
      takeOut: String!
      crewNum: Int!
      organizerId: ID!
    ): Trip

    updateTrip(
      id: ID!
      riverName: String
      startDate: String
      endDate: String
      putIn: String
      takeOut: String
      crewNum: Int
      organizerId: ID
    ): Trip

    deleteTrip(id: ID!): String
  }
`;

export default tripTypeDefs;
