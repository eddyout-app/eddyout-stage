// src/graphql/mutations/crewMutations.ts
import { gql } from "@apollo/client";

export const ADD_CREW_MEMBER = gql`
  mutation AddCrewMember($tripId: ID!, $userId: ID!, $role: String) {
    addCrewMember(tripId: $tripId, userId: $userId, role: $role) {
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

export const UPDATE_CREW_MEMBER = gql`
  mutation UpdateCrewMember($crewId: ID!, $role: String!) {
    updateCrewMember(crewId: $crewId, role: $role) {
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

export const REMOVE_CREW_MEMBER = gql`
  mutation RemoveCrewMember($crewMemberId: ID!) {
    removeCrewMember(crewMemberId: $crewMemberId)
  }
`;
