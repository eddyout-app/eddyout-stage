import { tripResolvers } from "./tripResolvers";
import { expenseResolvers } from "./expenseResolver";
import userPreferencesResolvers from "./userPreferencesResolvers";

import { gearItemResolvers } from "./gearItemResolver";
import { gearListResolvers } from "./gearListResolver";
import { weatherResolvers } from "./weatherResolver";

export const resolvers = {
    Query: {
        // Crew Queries
        // ...crewResolvers.Query,

        // Expense Queries
        ...expenseResolvers.Query,

        // GearItem Queries
        ...gearItemResolvers.Query,

        // GearList Queries
        ...gearListResolvers.Query,

        // Meal Queries
        // ...mealResolvers.Query,

        // Schedule Queries
        // ...scheduleResolvers.Query,

        // Trip Queries
        ...tripResolvers.Query,

        // User Queries
        // ...userResolvers.Query,

        // UserPreferences Queries
        ...userPreferencesResolvers.Query,

        //Weather Queries
        ...weatherResolvers.Query,

    },

    Mutation: {
        // Crew Queries
        // ...crewResolvers.Mutation,

        // Expense Queries
        ...expenseResolvers.Mutation,

        // GearItem Queries
        ...gearItemResolvers.Mutation,

        // GearList Queries
        ...gearListResolvers.Mutation,

        // Meal Queries
        // ...mealResolvers.Mutation,

        // Schedule Queries
        // ...scheduleResolvers.Mutation,

        // Trip Queries
        ...tripResolvers.Mutation,

        // User Queries
        // ...userResolvers.Mutation,

        // UserPreferences Queries
        ...userPreferencesResolvers.Mutation,

        // Weather Queries
        // ...weatherResolvers.Mutation,

    },
    Trip: {
        ...tripResolvers.Trip,
    },
};
