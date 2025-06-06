import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $role: String
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      role: $role
    ) {
      token
      user {
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
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        firstName
        lastName
        createdAt
        updatedAt
      }
    }
  }
`;
