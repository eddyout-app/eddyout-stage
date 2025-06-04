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
    claimMeal(mealId: ID!, userId: ID!, mealName: String!): Meal!
    updateMeal(mealId: ID!, userId: ID!, mealName: String!): Meal!
    claimOrUpdateMeal(mealId: ID!, userId: ID!, mealName: String!): Meal!
  }
`;

export default mealTypeDefs;
