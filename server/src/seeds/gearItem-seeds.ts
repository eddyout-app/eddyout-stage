import GearItem from "../models/gearItem.js";
import type mongoose from "mongoose";

// Minimal inline types for clarity
export const seedGear = async (
  users: { _id: mongoose.Types.ObjectId }[],
  trips: { _id: mongoose.Types.ObjectId }[],
  gearLists: { _id: mongoose.Types.ObjectId }[]
): Promise<void> => {
  try {
    await GearItem.insertMany([
      {
        gearItem: "Stove",
        quantity: 1,
        category: "Kitchen",
        claimedBy: users[1]._id,
        tripId: trips[0]._id,
        gearListId: gearLists[0]._id,
      },
      {
        gearItem: "Water Jugs",
        quantity: 7,
        category: "Boat Gear",
        claimedBy: users[1]._id,
        tripId: trips[0]._id,
        gearListId: gearLists[0]._id,
      },
      {
        gearItem: "Table",
        quantity: 3,
        category: "Camp Gear",
        claimedBy: users[0]._id,
        tripId: trips[0]._id,
        gearListId: gearLists[0]._id,
      },
      {
        gearItem: "Groover",
        quantity: 1,
        category: "Camp Gear",
        claimedBy: users[2]._id,
        tripId: trips[0]._id,
        gearListId: gearLists[0]._id,
      },
      {
        gearItem: "Toilet Paper Rolls",
        quantity: 5000,
        category: "Personal",
        claimedBy: users[2]._id,
        tripId: trips[0]._id,
        gearListId: gearLists[0]._id,
      },
      {
        gearItem: "Sun Shelter",
        quantity: 1,
        category: "Camp Gear",
        claimedBy: users[0]._id,
        tripId: trips[0]._id,
        gearListId: gearLists[0]._id,
      },
    ]);
    console.log("✅ GearItems seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding GearItems:", error);
  }
};
