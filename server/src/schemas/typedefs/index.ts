import { gql } from "graphql-tag";
import tripTypeDefs from "./tripTypeDefs";
import { expenseTypeDefs } from "./expenseTypeDefs";
import userPreferencesTypeDefs from "./userPreferencesTypeDefs";
import { gearItemTypeDefs } from "./gearItemTypeDefs";
import { gearListTypeDefs } from "./gearListTypeDefs";
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
  gearItemTypeDefs,
  gearListTypeDefs,
  // add others here as you build them
];
