import { gql } from "@apollo/client";

export const GET_CAMPSITES = gql`
  query GetCampsites($tripId: ID!) {
    campsites(tripId: $tripId) {
      _id
      tripId

      name
      description
      location {
        latitude
        longitude
      }
      startDate
      endDate
      weather {
        temperature
        conditions
        windSpeed
        humidity
        precipitation
      }
      createdAt
      updatedAt
    }
  }
`;
