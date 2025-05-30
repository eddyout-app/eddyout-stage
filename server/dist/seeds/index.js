import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { seedUsers } from "./user-seeds";
import { seedTrips } from "./trip-seeds";
import { seedCrew } from "./crew-seeds";
import { seedGear } from "./gear-seeds";
import { seedMeals } from "./meal-seeds";
import { seedSchedule } from "./schedule-seeds";

import User from "../models/user";
import Trip from "../models/trip";
import Crew from "../models/crew";
import GearItem from "../models/gearItem";
import Meals from "../models/meals";
import Schedule from "../models/schedule";

const seedAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("\n🔌 Connected to MongoDB\n");

    // Clear collections
    await Promise.all([
      User.deleteMany({}),
      Trip.deleteMany({}),
      Crew.deleteMany({}),
      GearItem.deleteMany({}),
      Meals.deleteMany({}),
      Schedule.deleteMany({})
    ]);

    const users = await seedUsers();
    const trips = await seedTrips(users);
    await seedCrew(users, trips);
    await seedGear(users, trips);
    await seedMeals(trips);
    await seedSchedule(trips);

    console.log("\n🌱 All data seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedAll();
