// const typeDefs = `
//   # Define which fields are accessible from the Class model
//   type Meal {
//     id: ID
//     tripId: ID
//     date: String
//     mealType: String
//     mealName: String
//     description: String
//     crewMember: String
//   }

//   type User {
//     id: ID!
//     username: String
//     email: String!
//     password: String
//     firstName: String
//     lastName: String
//   }

//   type Crew {
//     id: ID!
//     tripId: ID!
//     userId: ID!
//     user: User
//   }

//   type Auth {
//     token: String!
//     user: User!
//   }

//   input MealInput {
//     mealName: String!
//     mealType: String!
//     crewMember: String!
//     tripId: ID!
//     date: String!
//     description: String
//   }

//   input UserInput {
//     username: String!
//     email: String!
//     password: String!
//     firstName: String
//     lastName: String
//   }

//   input CrewInput {
//     tripId: ID!
//     userId: ID!
//   }

//   type Query {
//     getUsers: [User]
//     getUser(id: ID!): User
//     getAllCrew(tripId: ID!): [Crew]
//     getMealsForTrip(tripId: ID!): [Meal]
//   }

//   type Mutation {
//     createMeal(input: MealInput!): Meal
//     createUser(input: UserInput!): Auth
//     createCrew(input: CrewInput!): Crew
//     login(email: String!, password: String!): Auth
//   }
// `;

// export default typeDefs;
