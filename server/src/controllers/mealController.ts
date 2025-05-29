import { Request, Response } from 'express';
import { Meals } from '../models/meals.js';

export const getMealsForTrip = async (req: Request, res: Response) => {
    const tripId = req.params.tripId;

    try {
        const meals = await Meals.findAll({
            where: { tripId },
        });

        if (!meals) {
            return res.status(404).json({ message: "Meals not found for this trip" });
        }

        return res.status(200).json(meals);  // Return meals as JSON
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });  // Send JSON for internal errors
    }
};

export const createMeal = async (req: Request, res: Response) => {
    try {
        const meal = await Meals.create(req.body);
        res.status(201).json(meal);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};