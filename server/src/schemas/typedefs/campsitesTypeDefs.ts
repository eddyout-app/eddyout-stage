// src/schemas/typedefs/campsitesTypeDefs.ts

import { gql } from "graphql-tag";

const campsiteTypeDefs = gql`
  type Campsite {
    _id: ID!
    tripId: ID!
    name: String!
    description: String
    location: Location
    startDate: String!
    endDate: String
    weather: Weather
    createdAt: String
    updatedAt: String
  }

  type Location {
    latitude: Float
    longitude: Float
  }

  type Weather {
    temperature: Float
    conditions: String
    windSpeed: Float
    humidity: Float
    precipitation: Float
  }

  input LocationInput {
    latitude: Float
    longitude: Float
  }

  input WeatherInput {
    temperature: Float
    conditions: String
    windSpeed: Float
    humidity: Float
    precipitation: Float
  }

  extend type Query {
    campsites(tripId: ID!): [Campsite!]!
  }

  extend type Mutation {
    addCampsite(
      tripId: ID!
      name: String!
      description: String
      location: LocationInput
      startDate: String!
      endDate: String
      weather: WeatherInput
    ): Campsite!

    updateCampsite(
      campsiteId: ID!
      name: String
      description: String
      location: LocationInput
      startDate: String
      endDate: String
      weather: WeatherInput
    ): Campsite!

    deleteCampsite(campsiteId: ID!): Boolean!
  }
`;

export default campsiteTypeDefs;
