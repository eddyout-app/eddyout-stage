import { seedTrip } from "./trip-seeds";
import { seedUsers } from "./user-seeds";
import { seedCrew } from "./crew-seeds";
// import { seedMeals } from "./meal-seeds";

// import { seedExpense } from "./expense-seeds";
// import { seedGearCatalog } from "./gearCatalog-seeds";
// import { seedGear } from "./gearItem-seeds";
// import { seedGearLists } from "./gearList-seeds";
// import { seedUserPreferences } from "./userPreferences-seeds";
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
