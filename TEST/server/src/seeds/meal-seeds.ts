import { Meals } from "../models/meals";
import { v4 as uuidv4 } from "uuid";
import type { Trip } from "../models/trip";
import type { MealCreationAttributes } from "../models/meals";

/**
 * Create structured meal data for a trip, with a placeholder for future expense fields.
 */
const generateMealsForTrip = (tripId: string): MealCreationAttributes[] => [
  {
    date: "2024-06-06",
    mealName: "Breakfast Burritos",
    mealType: "Breakfast",
    crewMember: "Amani",
    description: "Vegetarian",
    tripId,
    // expense: null, // Uncomment/expand for expense tracking
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
 * Seeds the Meals table with sample data for all provided trips.
 * Future-proofed for expansion (e.g., expense tracking).
 *
 * @param trips - Array of Trip objects to associate meals with.
 */
export const seedMeals = async (trips: Trip[]): Promise<void> => {
  if (!trips?.length) return;

  const allMeals = trips.flatMap(trip =>
    generateMealsForTrip(trip.id).map(meal => ({
      id: uuidv4(), // Or let MongoDB auto-generate if using Mongoose
      ...meal,
      // expense: meal.expense || null, // For future expansion
    }))
  );

  try {
    await Meals.bulkCreate(allMeals);
    
    console.log(`Seeded ${allMeals.length} meals for ${trips.length} trips.`);
  } catch (error) {
    console.error("Error seeding meals:", error);
    throw error;
  }
};