"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { seedCrew } from "./crew-seeds";
// import { seedGear } from "./gear-seeds";
// import { seedMeals } from "./meal-seeds";
// import { seedUser } from "./user-seeds";
// import { seedSchedule } from "./schedule-seeds";
const trip_seeds_1 = require("./trip-seeds");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seedAll = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("\n✅ MongoDB connected\n");
        // const users = await seedUser();
        // console.log("\n✅ Users seeded\n");
        await (0, trip_seeds_1.seedTrip)([
            { _id: new mongoose_1.default.Types.ObjectId() }, // fake user for now
            { _id: new mongoose_1.default.Types.ObjectId() },
            { _id: new mongoose_1.default.Types.ObjectId() }
        ]);
        console.log("\n✅ Trips seeded\n");
        // await seedCrew(users, trips);
        // await seedSchedule(trips);
        // await seedMeals(trips);
        // await seedGear(users, trips, []);
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};
seedAll();
