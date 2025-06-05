import { tripResolvers } from "./tripResolvers";
import { expenseResolvers } from "./expenseResolver";
import userPreferencesResolvers from "./userPreferencesResolvers";
import { campsitesResolvers } from "./campsitesResolver";
import { gearItemResolvers } from "./gearItemResolver";
import { gearListResolvers } from "./gearListResolver";
// import { weatherResolvers } from "./weatherResolver";
import { gearCatalogResolvers } from "./gearCatalogResolver";
import { mealResolvers } from "./mealsResolver";
import { userResolvers } from "./userResolver";
import { crewResolvers } from "./crewResolvers";

export const resolvers = {
  Query: {
    // Crew Queries
    ...crewResolvers.Query,

    // Expense Queries
    ...expenseResolvers.Query,

    // GearItem Queries
    ...gearItemResolvers.Query,

    // GearList Queries
    ...gearListResolvers.Query,

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

    // GearList Queries
    ...gearListResolvers.Mutation,

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

