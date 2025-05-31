// import { seedCrew } from "./crew-seeds";
// import { seedGear } from "./gear-seeds";
// import { seedMeals } from "./meal-seeds";
// import { seedUser } from "./user-seeds";
// import { seedSchedule } from "./schedule-seeds";
import { seedTrip } from "./trip-seeds";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const seedAll = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("\n✅ MongoDB connected\n");

    // const users = await seedUser();
    // console.log("\n✅ Users seeded\n");

    await seedTrip([
      { _id: new mongoose.Types.ObjectId() }, // fake user for now
      { _id: new mongoose.Types.ObjectId() },
      { _id: new mongoose.Types.ObjectId() }
    ]);
    console.log("\n✅ Trips seeded\n");

    // await seedCrew(users, trips);
    // await seedSchedule(trips);
    // await seedMeals(trips);
    // await seedGear(users, trips, []);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedAll();
