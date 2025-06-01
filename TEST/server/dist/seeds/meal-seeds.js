"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMeals = void 0;
const meals_1 = require("../models/meals");
const uuid_1 = require("uuid");
const seedMeals = async (trips) => {
    if (!trips?.length)
        return;
    const tripId = trips[0].id;
    const mealData = [
        {
            date: "2024-06-06",
            mealName: "Breakfast Burritos",
            mealType: meals_1.MealType.Breakfast,
            crewMember: "Justin",
            description: "Vegetarian",
        },
        {
            date: "2024-06-06",
            mealType: meals_1.MealType.Lunch,
            mealName: "Curry Chicken Wrap",
            crewMember: "Lisa",
            description: "Can be made vegetarian if needed!",
        },
        {
            date: "2024-06-06",
            mealType: meals_1.MealType.Dinner,
            mealName: "Surf n Turf",
            crewMember: "Justin",
            description: "",
        },
        {
            date: "2024-06-07",
            mealType: meals_1.MealType.Breakfast,
            mealName: "Lox and Bagels",
            crewMember: "Elli",
            description: "",
        },
        {
            date: "2024-06-07",
            mealType: meals_1.MealType.Lunch,
            mealName: "Sesame Noodles",
            crewMember: "Elli",
            description: "",
        },
        {
            date: "2024-06-07",
            mealType: meals_1.MealType.Dinner,
            mealName: "Fancy Mac and Cheese",
            crewMember: "Lisa",
            description: "",
        },
    ];
    const mealsToCreate = mealData.map((meal) => ({
        id: (0, uuid_1.v4)(),
        ...meal,
        tripId,
    }));
    await meals_1.Meals.bulkCreate(mealsToCreate);
};
exports.seedMeals = seedMeals;
