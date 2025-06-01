import { Meals } from "../models/meals";
import { v4 as uuidv4 } from "uuid";
import type { Trip } from "../models/trip";

/**
 * Seeds the Meals table with sample data for the provided trips.
 *
 * @param trips - An array of Trip objects to associate meals with.
 */
export const seedMeals = async (trips: Trip[]) => {
  if (!trips?.length) return;

  const tripId = trips[0].id;

  const mealData = [
    {
      date: "2024-06-06",
      mealName: "Breakfast Burritos",
      mealType: "Breakfast",
      crewMember: "Amani",
      description: "Vegetarian",
    },
    {
      date: "2024-06-06",
      mealName: "Curry Chicken Wrap",
      mealType: "Lunch",
      crewMember: "Lisa",
      description: "Can be made vegetarian if needed!",
    },
    {
      date: "2024-06-06",
      mealName: "Surf n Turf",
      mealType: "Dinner",
      crewMember: "Amani",
      description: "",
    },
    {
      date: "2024-06-07",
      mealName: "Lox and Bagels",
      mealType: "Breakfast",
      crewMember: "Elli",
      description: "",
    },
    {
      date: "2024-06-07",
      mealName: "Sesame Noodles",
      mealType: "Lunch",
      crewMember: "Elli",
      description: "",
    },
    {
      date: "2024-06-07",
      mealName: "Fancy Mac and Cheese",
      mealType: "Dinner",
      crewMember: "Lisa",
      description: "",
    },
  ];

  const mealData = mealData.map((meal) => ({
    id: uuidv4(),
    ...meal,
    tripId,
  }));

  await Meals.bulkCreate(mealData);
};