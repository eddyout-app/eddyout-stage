"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMeals = void 0;
const meals_1 = require("../models/meals");
const uuid_1 = require("uuid");
/**
 * Creates structured meal data associated with a specific trip ID.
 *
 * @param tripId - The ID of the trip to associate meals with.
 * @returns Array of meal creation attributes.
 */
const generateMealsForTrip = (tripId) => [
    {
        date: "2024-06-06",
        mealName: "Breakfast Burritos",
        mealType: "Breakfast",
        crewMember: "Amani",
        description: "Vegetarian",
        tripId,
    },
    {
        date: "2024-06-06",
        mealName: "Curry Chicken Wrap",
        mealType: "Lunch",
        crewMember: "Lisa",
        description: "Can be made vegetarian if needed!",
        tripId,
    },
    {
        date: "2024-06-06",
        mealName: "Surf n Turf",
        mealType: "Dinner",
        crewMember: "Amani",
        description: "",
        tripId,
    },
    {
        date: "2024-06-07",
        mealName: "Lox and Bagels",
        mealType: "Breakfast",
        crewMember: "Elli",
        description: "",
        tripId,
    },
    {
        date: "2024-06-07",
        mealName: "Sesame Noodles",
        mealType: "Lunch",
        crewMember: "Elli",
        description: "",
        tripId,
    },
    {
        date: "2024-06-07",
        mealName: "Fancy Mac and Cheese",
        mealType: "Dinner",
        crewMember: "Lisa",
        description: "",
        tripId,
    },
];
/**
 * Seeds the Meals table with sample data for the provided trips.
 *
 * @param trips - An array of Trip objects to associate meals with.
 */
const seedMeals = async (trips) => {
    if (!trips?.length)
        return;
    const [firstTrip] = trips;
    const baseMeals = generateMealsForTrip(firstTrip.id);
    const mealsToInsert = baseMeals.map(meal => ({
        id: (0, uuid_1.v4)(),
        ...meal,
    }));
    await meals_1.Meals.bulkCreate(mealsToInsert);
};
exports.seedMeals = seedMeals;
//# sourceMappingURL=meal-seeds.js.map