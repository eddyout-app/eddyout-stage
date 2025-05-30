import Meals from "../models/meals";

export const seedMeals = async (trips: any[]) => {
  await Meals.insertMany([
    {
      date: new Date("2024-06-06"),
      mealName: "Breakfast Burritos",
      mealType: "Breakfast",
      crewMember: "Justin",
      tripId: trips[0]._id,
      description: "Vegetarian",
    },
    {
      date: new Date("2024-06-06"),
      mealType: "Lunch",
      mealName: "Curry Chicken Wrap",
      crewMember: "Lisa",
      tripId: trips[0]._id,
      description: "Can be made vegetarian if needed!",
    },
    {
      date: new Date("2024-06-06"),
      mealType: "Dinner",
      mealName: "Surf n Turf",
      crewMember: "Justin",
      tripId: trips[0]._id,
      description: "",
    },
    {
      date: new Date("2024-06-07"),
      mealType: "Breakfast",
      mealName: "Lox and Bagels",
      crewMember: "Elli",
      tripId: trips[0]._id,
      description: "",
    },
    {
      date: new Date("2024-06-07"),
      mealType: "Lunch",
      mealName: "Sesame Noodles",
      crewMember: "Elli",
      tripId: trips[0]._id,
      description: "",
    },
    {
      date: new Date("2024-06-07"),
      mealType: "Dinner",
      mealName: "Fancy Mac and Cheese",
      crewMember: "Lisa",
      tripId: trips[0]._id,
      description: "",
    },
  ]);
  console.log("✅ Meals seeded");
};