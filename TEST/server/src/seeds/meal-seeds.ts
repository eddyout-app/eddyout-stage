import { Meals } from "../models/meals";
import { v4 as uuidv4 } from "uuid";
import type { Trip } from "../models/trip";
import type { MealCreationAttributes } from "../models/meals";

/**
 * Creates structured meal data associated with a specific trip ID.
 *
 * @param tripId - The ID of the trip to associate meals with.
 * @returns Array of meal creation attributes.
 */
const generateMealsForTrip = (tripId: string): MealCreationAttributes[] => [
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
export const seedMeals = async (trips: Trip[]): Promise<void> => {
  if (!trips?.length) return;

  const [firstTrip] = trips;
  const baseMeals = generateMealsForTrip(firstTrip.id);

  const mealsToInsert = baseMeals.map(meal => ({
    id: uuidv4(),
    ...meal,
  }));

  await Meals.bulkCreate(mealsToInsert);
};
