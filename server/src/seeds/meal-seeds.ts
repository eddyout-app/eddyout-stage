import { Meals } from "../models/meals";
import { v4 as uuidv4 } from "uuid";
import type { Trip } from "../models/trip";

export const seedMeals = async (trips: Trip[]) => {
  await Meals.bulkCreate([
    {
      id: uuidv4(),
      date: "2024-06-06",
      mealName: "Breakfast Burritos",
      mealType: "Breakfast",
      crewMember: "Justin",
      tripId: trips[0].id,
      description: "Vegetarian",
    },
    {
      id: uuidv4(),
      date: "2024-06-06",
      mealType: "Lunch",
      mealName: "Curry Chicken Wrap",
      crewMember: "Lisa",
      tripId: trips[0].id,
      description: "Can be made vegetarian if needed!",
    },
    {
      id: uuidv4(),
      date: "2024-06-06",
      mealType: "Dinner",
      mealName: "Surf n Turf",
      crewMember: "Justin",
      tripId: trips[0].id,
      description: "",
    },
    {
      id: uuidv4(),
      date: "2024-06-07",
      mealType: "Breakfast",
      mealName: "Lox and Bagels",
      crewMember: "Elli",
      tripId: trips[0].id,
      description: "",
    },
    {
      id: uuidv4(),
      date: "2024-06-07",
      mealType: "Lunch",
      mealName: "Sesame Noodles",
      crewMember: "Elli",
      tripId: trips[0].id,
      description: "",
    },
    {
      id: uuidv4(),
      date: "2024-06-07",
      mealType: "Dinner",
      mealName: "Fancy Mac and Cheese",
      crewMember: "Lisa",
      tripId: trips[0].id,
      description: "",
    },
  ]);
};
