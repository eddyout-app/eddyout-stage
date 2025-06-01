"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMeal = exports.getMealsForTrip = void 0;
const meals_js_1 = require("../models/meals.js");
// Fetch meals for a given trip
const getMealsForTrip = async (req, res) => {
    const { tripId } = req.params;
    try {
        const meals = await meals_js_1.Meals.findAll({ where: { tripId } });
        if (!meals || meals.length === 0) {
            return res.status(404).json({ message: "Meals not found for this trip" });
        }
        return res.status(200).json(meals);
    }
    catch (error) {
        console.error('Error fetching meals:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getMealsForTrip = getMealsForTrip;
// Create a new meal
const createMeal = async (req, res) => {
    try {
        const meal = await meals_js_1.Meals.create(req.body);
        return res.status(201).json(meal);
    }
    catch (error) {
        console.error('Error creating meal:', error);
        return res.status(400).json({ message: error.message });
    }
};
exports.createMeal = createMeal;
