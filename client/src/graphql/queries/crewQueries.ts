import { gql } from "@apollo/client";

export const GET_CREW_MEMBERS = gql`
  query GetCrewMembersByTrip($tripId: ID!) {
    crewMembersByTrip(tripId: $tripId) {
      _id
      tripId
      userId
      roleId
      role {
        _id
        name
        description
      }
      createdAt
      updatedAt
    }
  }
`;
