"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const tripResolvers_1 = require("./tripResolvers");
const expenseResolver_1 = require("./expenseResolver");
const userPreferencesResolvers_1 = __importDefault(require("./userPreferencesResolvers"));
exports.resolvers = {
    Query: {
        // Crew Queries
        // ...crewResolvers.Query,
        // Expense Queries
        ...expenseResolver_1.expenseResolvers.Query,
        // GearItem Queries
        // ...gearItemResolvers.Query,
        // GearList Queries
        // ...gearListResolvers.Query,
        // Meal Queries
        // ...mealResolvers.Query,
        // Schedule Queries
        // ...scheduleResolvers.Query,
        // Trip Queries
        ...tripResolvers_1.tripResolvers.Query,
        // User Queries
        // ...userResolvers.Query,
        // UserPreferences Queries
        ...userPreferencesResolvers_1.default.Query,
    },
    Mutation: {
        // Crew Queries
        // ...crewResolvers.Mutation,
        // Expense Queries
        ...expenseResolver_1.expenseResolvers.Mutation,
        // GearItem Queries
        // ...gearItemResolvers.Mutation,
        // GearList Queries
        // ...gearListResolvers.Mutation,
        // Meal Queries
        // ...mealResolvers.Mutation,
        // Schedule Queries
        // ...scheduleResolvers.Mutation,
        // Trip Queries
        ...tripResolvers_1.tripResolvers.Mutation,
        // User Queries
        // ...userResolvers.Mutation,
        // UserPreferences Queries
        ...userPreferencesResolvers_1.default.Mutation,
    },
    Trip: {
        ...tripResolvers_1.tripResolvers.Trip,
    },
};
