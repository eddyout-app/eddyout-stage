"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMeals = void 0;
const meals_1 = require("../models/meals");
const uuid_1 = require("uuid");
const seedMeals = async (trips) => {
    await meals_1.Meals.bulkCreate([
        {
            id: (0, uuid_1.v4)(),
            date: "2024-06-06",
            mealName: "Breakfast Burritos",
            mealType: "Breakfast",
            crewMember: "Justin",
            tripId: trips[0].id,
            description: "Vegetarian",
        },
        {
            id: (0, uuid_1.v4)(),
            date: "2024-06-06",
            mealType: "Lunch",
            mealName: "Curry Chicken Wrap",
            crewMember: "Lisa",
            tripId: trips[0].id,
            description: "Can be made vegetarian if needed!",
        },
        {
            id: (0, uuid_1.v4)(),
            date: "2024-06-06",
            mealType: "Dinner",
            mealName: "Surf n Turf",
            crewMember: "Justin",
            tripId: trips[0].id,
            description: "",
        },
        {
            id: (0, uuid_1.v4)(),
            date: "2024-06-07",
            mealType: "Breakfast",
            mealName: "Lox and Bagels",
            crewMember: "Elli",
            tripId: trips[0].id,
            description: "",
        },
        {
            id: (0, uuid_1.v4)(),
            date: "2024-06-07",
            mealType: "Lunch",
            mealName: "Sesame Noodles",
            crewMember: "Elli",
            tripId: trips[0].id,
            description: "",
        },
        {
            id: (0, uuid_1.v4)(),
            date: "2024-06-07",
            mealType: "Dinner",
            mealName: "Fancy Mac and Cheese",
            crewMember: "Lisa",
            tripId: trips[0].id,
            description: "",
        },
    ]);
};
exports.seedMeals = seedMeals;
//# sourceMappingURL=meal-seeds.js.map