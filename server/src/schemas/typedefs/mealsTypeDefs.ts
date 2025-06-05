import { gql } from "graphql-tag";

const mealTypeDefs = gql`
  type Meal {
    _id: ID!
    tripId: ID!
    mealType: String!
    mealName: String
    date: String!
    userId: User
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    mealsByTrip(tripId: ID!): [Meal!]!
  }

  extend type Mutation {
    addMeal(
      tripId: ID!
      date: String!
      mealType: String!
      userId: ID!
      mealName: String!
    ): Meal!
    claimMeal(mealId: ID!, userId: ID!, mealName: String!): Meal!
    updateMeal(mealId: ID!, userId: ID!, mealName: String!): Meal!
    claimOrUpdateMeal(mealId: ID!, userId: ID!, mealName: String!): Meal!
  }
`;

export default mealTypeDefs;
