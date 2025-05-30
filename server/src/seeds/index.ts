import { seedCrew } from "./crew-seeds";
// import { seedGear } from "./gear-seeds";
// import { seedMeals } from "./meal-seeds";
import { seedUser } from "./user-seeds";
import { seedSchedule } from "./schedule-seeds";
import { seedTrip } from "./trip-seeds";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const seedAll = async (): Promise<void> => {
  try {
    await await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("\n----- DATABASE SYNCED -----\n");

    const users = await seedUser();
    console.log("\n----- USERS SEEDED -----\n");

    const trips = await seedTrip(users);
    console.log("\n----- TRIPS SEEDED -----\n");

    await seedCrew(users, trips);
    console.log("\n----- CREW SEEDED -----\n");

    // If you have gear lists:
    // const gearLists = await seedGearList(trips);
    // await seedGear(trips, users, gearLists);
    // await seedGear(users, trips, []); // ← Temporary fallback if no gearLists yet
    // console.log("\n----- GEAR SEEDED -----\n");

    // await seedMeals(trips);
    // console.log("\n----- MEALS SEEDED -----\n");

    await seedSchedule(trips);
    console.log("\n----- SCHEDULE SEEDED -----\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedAll();
