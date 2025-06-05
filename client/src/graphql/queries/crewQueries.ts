// src/graphql/queries/crewQueries.ts
import { gql } from "@apollo/client";

export const GET_CREW_BY_TRIP = gql`
  query GetCrewByTrip($tripId: ID!) {
    crewByTrip(tripId: $tripId) {
      _id
      tripId
      userId {
        _id
        fullName
      }
      role
      createdAt
      updatedAt
    }
  }
`;
