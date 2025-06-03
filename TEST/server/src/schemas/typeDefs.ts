const typeDefs = `
  # Define which fields are accessible from the Class model
  type Meal {
    id: String
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
    password: String!
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
    getUser(id:ID!): User
    getMealsForTrip(tripId: ID!) : [Meal]  
  }

  type Mutation {
    createMeal(input: MealInput!): Meal
    createUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth 
  }
`
;

export default typeDefs;