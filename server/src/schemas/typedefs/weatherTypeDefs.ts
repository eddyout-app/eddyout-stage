import { gql } from "graphql-tag";

export const weatherTypeDefs = gql`
  type Weather {
    date: String
    temperature: Float
    description: String
  }

  extend type Query {
    weatherForecast(lat: Float!, lon: Float!): [Weather!]!
  }
`;
