import { seedTrip } from "./trip-seeds.js";
import { seedUsers } from "./user-seeds.js";
import { seedCrew } from "./crew-seeds.js";
// import { seedMeals } from "./meal-seeds.js";

// import { seedExpense } from "./expense-seeds.js";
// import { seedGearCatalog } from "./gearCatalog-seeds.js";
// import { seedGear } from "./gearItem-seeds.js";

// import { seedUserPreferences } from "./userPreferences-seeds.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import User from "../models/user";

dotenv.config();

const seedAll = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string);

    const users = await seedUsers();
    if (users.length === 0) throw new Error("User seed failed");
    console.log("\n✅ Users seeded\n");

    const trips = await seedTrip(users);
    console.log("\n✅ Trips seeded\n");

    await seedCrew(users, trips);
    console.log("\n✅ Crew seeded\n");

    // Seed MEALS
    // await seedMeals(trips, users);
    // console.log("\n✅ Meals seeded\n");

    // Seed GEAR CATALOG
    // await seedGearCatalog();
    // console.log("\n✅ GearCatalogItems seeded\n");

    // Seed GEAR LISTS
    // await seedGearLists(trips);
    // console.log("\n✅ GearLists seeded\n");

    process.exit(0); // Success
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1); // Failure
  }
};

// Run the seeding function
seedAll();
