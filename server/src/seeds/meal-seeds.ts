// // src/seeds/meal-seeds.ts

// import Meals from "../models/meals.js";
// import type mongoose from "mongoose";

// export const seedMeals = async (
//   trips: { _id: mongoose.Types.ObjectId }[],
//   users: { _id: mongoose.Types.ObjectId }[]
// ) => {
//   try {
//     await Meals.insertMany([
//       {
//         date: new Date("2024-06-06"),
//         mealName: "Breakfast Burritos",
//         mealType: "Breakfast",
//         userId: users[0]._id, // Justin
//         tripId: trips[0]._id,
//         description: "Vegetarian",
//       },
//       {
//         date: new Date("2024-06-06"),
//         mealName: "Curry Chicken Wrap",
//         mealType: "Lunch",
//         userId: users[1]._id, // Lisa
//         tripId: trips[0]._id,
//         description: "Can be made vegetarian if needed!",
//       },
//       {
//         date: new Date("2024-06-06"),
//         mealName: "Surf n Turf",
//         mealType: "Dinner",
//         userId: users[0]._id, // Justin
//         tripId: trips[0]._id,
//         description: "",
//       },
//       {
//         date: new Date("2024-06-07"),
//         mealName: "Lox and Bagels",
//         mealType: "Breakfast",
//         userId: users[2]._id, // Elli
//         tripId: trips[0]._id,
//         description: "",
//       },
//       {
//         date: new Date("2024-06-07"),
//         mealName: "Sesame Noodles",
//         mealType: "Lunch",
//         userId: users[2]._id, // Elli
//         tripId: trips[0]._id,
//         description: "",
//       },
//       {
//         date: new Date("2024-06-07"),
//         mealName: "Fancy Mac and Cheese",
//         mealType: "Dinner",
//         userId: users[1]._id, // Lisa
//         tripId: trips[0]._id,
//         description: "",
//       },
//     ]);

//     console.log("✅ Meals seeded successfully");
//   } catch (error) {
//     console.error("❌ Error seeding Meals:", error);
//   }
// };
