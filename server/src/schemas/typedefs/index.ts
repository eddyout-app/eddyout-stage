import { gql } from "graphql-tag";
import tripTypeDefs from "./tripTypeDefs";
import { expenseTypeDefs } from "./expenseTypeDefs";
import userPreferencesTypeDefs from "./userPreferencesTypeDefs";
import { weatherTypeDefs } from "./weatherTypeDefs";
// import other typedefs when ready

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export default [
  baseTypeDefs,
  tripTypeDefs,
  expenseTypeDefs,
  userPreferencesTypeDefs,
  weatherTypeDefs,
  // add others here as you build them
];
