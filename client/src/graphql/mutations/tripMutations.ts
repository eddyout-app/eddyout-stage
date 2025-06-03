// src/graphql/mutations/tripMutations.ts

import { gql } from "@apollo/client";

export const CREATE_TRIP = gql`
  mutation CreateTrip(
    $riverName: String!
    $startDate: String!
    $endDate: String!
    $putIn: String!
    $takeOut: String!
    $crewNum: Int!
    $organizerId: ID!
  ) {
    createTrip(
      riverName: $riverName
      startDate: $startDate
      endDate: $endDate
      putIn: $putIn
      takeOut: $takeOut
      crewNum: $crewNum
      organizerId: $organizerId
    ) {
      _id
      riverName
      startDate
      endDate
      putIn
      takeOut
      crewNum
      organizerId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TRIP = gql`
  mutation UpdateTrip(
    $id: ID!
    $riverName: String
    $startDate: String
    $endDate: String
    $putIn: String
    $takeOut: String
    $crewNum: Int
    $organizerId: ID
  ) {
    updateTrip(
      id: $id
      riverName: $riverName
      startDate: $startDate
      endDate: $endDate
      putIn: $putIn
      takeOut: $takeOut
      crewNum: $crewNum
      organizerId: $organizerId
    ) {
      _id
      riverName
      startDate
      endDate
      putIn
      takeOut
      crewNum
      organizerId
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TRIP = gql`
  mutation DeleteTrip($id: ID!) {
    deleteTrip(id: $id)
  }
`;
