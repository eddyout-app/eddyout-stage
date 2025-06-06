import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      firstName
      lastName
      role
      userDetails {
        id
        dietaryRestrictions
        venmoHandle
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      firstName
      lastName
      role
      userDetails {
        id
        dietaryRestrictions
        venmoHandle
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      firstName
      lastName
      role
      createdAt
      updatedAt
    }
  }
`;
