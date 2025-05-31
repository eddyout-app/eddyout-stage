import { gql } from "graphql-tag";
import tripTypeDefs from "./tripTypeDefs";
import { expenseTypeDefs } from "./expenseTypeDefs";
// import other typedefs when ready

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export default [
    baseTypeDefs,
    tripTypeDefs,
    expenseTypeDefs,
    // add others here as you build them
];
