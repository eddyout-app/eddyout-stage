"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Trip {
    _id: ID!
    riverName: String!
    startDate: String
    endDate: String
    putIn: String
    takeOut: String
    crewNum: Int
    organizerId: ID
  }

  input TripInput {
    riverName: String!
    startDate: String
    endDate: String
    putIn: String
    takeOut: String
    crewNum: Int
    organizerId: ID
  }

  type Query {
    trips: [Trip]
  }

  type Mutation {
    addTrip(input: TripInput!): Trip
  }
`;
exports.default = typeDefs;
