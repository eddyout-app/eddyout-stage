import { seedGear } from "./gearItem-seeds";
import { seedGearLists } from "./gearList-seeds";
import { seedMeals } from "./meal-seeds";
import { seedUsers } from "./user-seeds";
import { seedTrip } from "./trip-seeds";
import { seedCrew } from "./crew-seeds";
import { seedCampsites } from "./campsite-seeds";
// import { seedExpense } from "./expense-seeds";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user";

dotenv.config();

const seedAll = async (): Promise<void> => {
  try {
    // Log Mongo URI for debugging purposes
    console.log("DEBUG: MONGODB_URI =", process.env.MONGODB_URI);

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("\n✅ MongoDB connected\n");

    // Clear the users collection before seeding
    await User.deleteMany({});  // Deletes all users
    console.log("\n✅ Users collection cleared\n");

    // Seed USERS — must happen first (needed for trips + meals)
    const users = await seedUsers();
    if (users.length === 0) throw new Error("User seed failed");
    console.log("\n✅ Users seeded\n");

    // Seed TRIPS
    const trips = await seedTrip([
      { _id: new mongoose.Types.ObjectId() },
      { _id: new mongoose.Types.ObjectId() },
    ]);
    console.log("\n✅ Trips seeded\n");

    // Uncomment to seed Crew or other data
    await seedCrew(users, trips);
    await seedCampsites(trips);
    await seedMeals(users, trips);  // Pass both users and trips as required

    // Seed Gear Lists
    const gearLists = await seedGearLists(trips);
    console.log("\n✅ Gear Lists seeded\n");

    // Uncomment if you want to seed Gear items (this requires users and trips data)
    // await seedGear(users, trips, gearLists);  // ⚠️ uncomment when `users` is seeded

    // You can add more seeding functions here if needed
    // await seedExpense(trips);

    process.exit(0); // Success
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1); // Failure
  }
};

// Run the seeding function
seedAll();
