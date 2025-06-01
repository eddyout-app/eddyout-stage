import { Request, Response } from 'express';
import { Meals } from '../models/meals.js';

// Fetch meals for a given trip
export const getMealsForTrip = async (req: Request, res: Response): Promise<Response> => {
    const { tripId } = req.params;

    try {
        const meals = await Meals.findAll({ where: { tripId } });

        if (!meals || meals.length === 0) {
            return res.status(404).json({ message: "Meals not found for this trip" });
        }

        return res.status(200).json(meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Create a new meal
export const createMeal = async (req: Request, res: Response): Promise<Response> => {
    try {
        const meal = await Meals.create(req.body);
        return res.status(201).json(meal);
    } catch (error: any) {
        console.error('Error creating meal:', error);
        return res.status(400).json({ message: error.message });
    }
};