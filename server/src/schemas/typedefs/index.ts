import { gql } from "graphql-tag";
import tripTypeDefs from "./tripTypeDefs";
import { expenseTypeDefs } from "./expenseTypeDefs";
import userPreferencesTypeDefs from "./userPreferencesTypeDefs";
import { gearItemTypeDefs } from "./gearItemTypeDefs";
import { gearListTypeDefs } from "./gearListTypeDefs";
import { gearCatalogTypeDefs } from "./gearCatalogTypeDefs";
import { weatherTypeDefs } from "./weatherTypeDefs";
import campsiteTypeDefs from "./campsitesTypeDefs";
import mealTypeDefs from "./mealsTypeDefs";
import { userTypeDefs } from "./userTypeDefs";
import crewTypeDefs from "./crewTypeDefs";

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
  gearCatalogTypeDefs,
  campsiteTypeDefs,
  weatherTypeDefs,
  mealTypeDefs,
  userTypeDefs,
  crewTypeDefs,
];
