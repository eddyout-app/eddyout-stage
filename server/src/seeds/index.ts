// import { seedCrew } from "./crew-seeds";
// import { seedGear } from "./gearItem-seeds";
import { seedGearLists } from "./gearList-seeds";
// import { seedMeals } from "./meal-seeds";
// import { seedUser } from "./user-seeds";
// import { seedSchedule } from "./schedule-seeds";
import { seedTrip } from "./trip-seeds";
import { seedMeals } from "./meal-seeds";
// import { seedCampsites } from "./campsite-seeds";
// import { seedExpense } from "./expense-seeds";
import { seedUsers } from "./user-seeds";
import { seedGearCatalog } from "./gearCatalog-seeds";
// import { seedUserPreferences } from "./userPreferences-seeds";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const seedAll = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("\n✅ MongoDB connected\n");

    // Seed USERS — must happen first (needed for trips + meals)
    const users = await seedUsers();
    if (users.length === 0) throw new Error("User seed failed");
    console.log("\n✅ Users seeded\n");

    const trips = await seedTrip([
      { _id: new mongoose.Types.ObjectId() },
      { _id: new mongoose.Types.ObjectId() },
    ]);
    console.log("\n✅ Trips seeded\n");

    // Seed MEALS
    await seedMeals(trips, users);
    console.log("\n✅ Meals seeded\n");

    // Seed CAMPSITES (Campsites)
    // await seedCampsites(trips);
    // console.log("\n✅ Campsites / Campsites seeded\n");

    // Seed GEAR CATALOG
    await seedGearCatalog();
    console.log("\n✅ GearCatalogItems seeded\n");

    // Seed GEAR LISTS
    await seedGearLists(trips);
    console.log("\n✅ GearLists seeded\n");

    // Seed GEAR ITEMS (optional — can also test through UI)
    // await seedGear([], trips, gearLists);
    // console.log("\n✅ GearItems seeded\n");

    // Seed CREW
    // await seedCrew([], trips);
    // console.log("\n✅ Crew seeded\n");

    // Seed EXPENSES — not needed right now
    // await seedExpense();

    // Seed USER PREFERENCES — not needed right now
    // await seedUserPreferences();

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedAll();
