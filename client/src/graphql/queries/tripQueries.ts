// src/graphql/queries/tripQueries.ts

import { gql } from "@apollo/client";

export const GET_ALL_TRIPS = gql`
  query GetAllTrips {
    trips {
      _id
      riverName
      startDate
      endDate
      putIn
      takeOut
      crewNum
      organizerId
    }
  }
`;

export const GET_TRIP_BY_ID = gql`
  query GetTripById($id: ID!) {
    trip(id: $id) {
      _id
      riverName
      startDate
      endDate
      putIn
      takeOut
      crewNum
      organizerId
    }
  }
`;
