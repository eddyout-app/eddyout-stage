"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const tripTypeDefs = (0, apollo_server_express_1.gql) `
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
exports.default = tripTypeDefs;
