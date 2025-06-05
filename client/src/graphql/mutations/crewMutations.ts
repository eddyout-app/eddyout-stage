import { gql } from "@apollo/client";

export const UPDATE_CREW_MEMBER = gql`
  mutation UpdateCrewMember($id: ID!, $roleId: ID!) {
    updateCrewMember(id: $id, roleId: $roleId) {
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

export const REMOVE_CREW_MEMBER = gql`
  mutation RemoveCrewMember($id: ID!) {
    removeCrewMember(id: $id)
  }
`;
