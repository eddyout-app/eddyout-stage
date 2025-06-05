"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMeal = exports.getMealsForTrip = void 0;
const meals_js_1 = require("../models/meals.js");
const getMealsForTrip = async (req, res) => {
    const tripId = req.params.tripId;
    try {
        const meals = await meals_js_1.Meals.findAll({
            where: { tripId },
        });
        if (!meals) {
            return res.status(404).json({ message: "Meals not found for this trip" });
        }
        return res.status(200).json(meals); // Return meals as JSON
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" }); // Send JSON for internal errors
    }
};
exports.getMealsForTrip = getMealsForTrip;
const createMeal = async (req, res) => {
    try {
        const meal = await meals_js_1.Meals.create(req.body);
        res.status(201).json(meal);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createMeal = createMeal;
//# sourceMappingURL=mealController.js.map