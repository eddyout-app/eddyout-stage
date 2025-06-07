import { tripResolvers } from "./tripResolvers.js";
import { expenseResolvers } from "./expenseResolver.js";
import userPreferencesResolvers from "./userPreferencesResolvers.js";
import { campsitesResolvers } from "./campsitesResolver.js";
import { gearItemResolvers } from "./gearItemResolver.js";
// import { weatherResolvers } from "./weatherResolver.js";
import { gearCatalogResolvers } from "./gearCatalogResolver.js";
import { mealResolvers } from "./mealsResolver.js";
import { userResolvers } from "./userResolver.js";
import { crewResolvers } from "./crewResolvers.js";

export const resolvers = {
  Query: {
    // Crew Queries
    ...crewResolvers.Query,

    // Expense Queries
    ...expenseResolvers.Query,

    // GearItem Queries
    ...gearItemResolvers.Query,

    // GearCatalog Queries
    ...gearCatalogResolvers.Query,

    // Meal Queries
    ...mealResolvers.Query,

    // Campsites Queries
    ...campsitesResolvers.Query,

    // Trip Queries
    ...tripResolvers.Query,

    // User Queries
    ...userResolvers.Query,

    // UserPreferences Queries
    ...userPreferencesResolvers.Query,

    //Weather Queries
    // ...weatherResolvers.Query,
  },

  Mutation: {
    // Campsites Queries
    ...campsitesResolvers.Mutation,

    // Crew Queries
    ...crewResolvers.Mutation,

    // Expense Queries
    ...expenseResolvers.Mutation,

    // GearItem Queries
    ...gearItemResolvers.Mutation,

    // GearCatalog Queries
    ...gearCatalogResolvers.Mutation,

    // Meal Queries
    ...mealResolvers.Mutation,

    // Trip Queries
    ...tripResolvers.Mutation,

    // User Queries
    ...userResolvers.Mutation,

    // UserPreferences Queries
    ...userPreferencesResolvers.Mutation,

    // Weather Queries
    // ...weatherResolvers.Mutation,
  },

  Trip: {
    ...tripResolvers.Trip,
  },
};
