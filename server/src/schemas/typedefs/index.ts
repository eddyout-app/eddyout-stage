import { gql } from "graphql-tag";
import tripTypeDefs from "./tripTypeDefs.js";
import { expenseTypeDefs } from "./expenseTypeDefs.js";
import userPreferencesTypeDefs from "./userPreferencesTypeDefs.js";
import { gearItemTypeDefs } from "./gearItemTypeDefs.js";
import { gearCatalogTypeDefs } from "./gearCatalogTypeDefs.js";
import { weatherTypeDefs } from "./weatherTypeDefs.js";
import campsiteTypeDefs from "./campsitesTypeDefs.js";
import mealTypeDefs from "./mealsTypeDefs.js";
import { userTypeDefs } from "./userTypeDefs.js";
import crewTypeDefs from "./crewTypeDefs.js";

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
  gearCatalogTypeDefs,
  campsiteTypeDefs,
  weatherTypeDefs,
  mealTypeDefs,
  userTypeDefs,
  crewTypeDefs,
];
