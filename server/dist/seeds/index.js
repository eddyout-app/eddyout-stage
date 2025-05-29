"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crew_seeds_1 = require("./crew-seeds");
// import { seedGear } from "./gear-seeds";
// import { seedMeals } from "./meal-seeds";
const user_seeds_1 = require("./user-seeds");
const schedule_seeds_1 = require("./schedule-seeds");
const trip_seeds_1 = require("./trip-seeds");
const connection_1 = require("../config/connection");
// import { seedGearList } from "./gearList-seeds"; // Uncomment if using gearList seeds
const seedAll = async () => {
    try {
        await connection_1.sequelize.sync({ force: true });
        console.log("\n----- DATABASE SYNCED -----\n");
        const users = await (0, user_seeds_1.seedUser)();
        console.log("\n----- USERS SEEDED -----\n");
        const trips = await (0, trip_seeds_1.seedTrip)(users);
        console.log("\n----- TRIPS SEEDED -----\n");
        await (0, crew_seeds_1.seedCrew)(users, trips);
        console.log("\n----- CREW SEEDED -----\n");
        // If you have gear lists:
        // const gearLists = await seedGearList(trips);
        // await seedGear(trips, users, gearLists);
        // await seedGear(users, trips, []); // ← Temporary fallback if no gearLists yet
        // console.log("\n----- GEAR SEEDED -----\n");
        // await seedMeals(trips);
        // console.log("\n----- MEALS SEEDED -----\n");
        await (0, schedule_seeds_1.seedSchedule)(trips);
        console.log("\n----- SCHEDULE SEEDED -----\n");
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};
seedAll();
