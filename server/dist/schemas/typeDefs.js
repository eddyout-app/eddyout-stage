"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `
  # Define which fields are accessible from the Class model
  type Meal {
    id: string
    tripId: String
    date: String
    mealType: string
    mealName: string
    description: string
    crewMember: string
  }

  type User {
    _id: ID!
    username: String
    email: String!
    password: String
  }

  input MealInput {
    mealName: String!
    mealType: String!
    crewMember: String!
    tripId: ID!;
    date: String!; 
    description: String
  }

  input UserInput {
   username: String!;
   email: String!;
   password: String!
   firstName: String
   lastName: String
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    getUsers: [User]
    getUser(id:ID!): User
    getMealsForTrip(tripId: ID!) : [Meal]  
  }

  type Mutation {
    createMeal(input: MealInput!): Meal
    createUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth 
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map