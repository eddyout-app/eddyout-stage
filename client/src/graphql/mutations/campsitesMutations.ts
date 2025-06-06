import { gql } from "@apollo/client";

export const ADD_CAMPSITE = gql`
  mutation AddCampsite(
    $tripId: ID!
    $name: String!
    $description: String
    $location: LocationInput
    $startDate: String!
    $endDate: String
    $weather: WeatherInput
  ) {
    addCampsite(
      tripId: $tripId
      name: $name
      description: $description
      location: $location
      startDate: $startDate
      endDate: $endDate
      weather: $weather
    ) {
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

export const UPDATE_CAMPSITE = gql`
  mutation UpdateCampsite(
    $campsiteId: ID!
    $name: String
    $description: String
    $location: LocationInput
    $startDate: String
    $endDate: String
    $weather: WeatherInput
  ) {
    updateCampsite(
      campsiteId: $campsiteId
      name: $name
      description: $description
      location: $location
      startDate: $startDate
      endDate: $endDate
      weather: $weather
    ) {
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

export const DELETE_CAMPSITE = gql`
  mutation DeleteCampsite($campsiteId: ID!) {
    deleteCampsite(campsiteId: $campsiteId)
  }
`;
