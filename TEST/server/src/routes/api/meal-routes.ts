import express from 'express';
import { getMealsForTrip, createMeal } from '../../controllers/mealController.js';
const router = express.Router();
router.get('/:tripId', getMealsForTrip);
router.post('/', createMeal);
export { router as mealRouter };