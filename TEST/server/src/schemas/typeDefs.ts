import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Meal {
    id: ID!
    tripId: String
    date: String
    mealType: String
    mealName: String
    description: String
    crewMember: String
  }

  type User {
    _id: ID!
    username: String
    email: String!
    password: String
  }

  type CrewMember {
    _id: ID!
    userId: ID!
    tripId: ID!
  }

  input MealInput {
    mealName: String!
    mealType: String!
    crewMember: String!
    tripId: ID!
    date: String!
    description: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
  }

  type Auth {
    token: String
    user: User
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getMealsForTrip(tripId: ID!): [Meal]
    getAllCrew: [CrewMember]
  }

  type Mutation {
    createMeal(input: MealInput!): Meal
    createUser(input: UserInput!): Auth
    createCrewMember(userId: ID!, tripId: ID!): CrewMember
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
