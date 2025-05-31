"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTrip = void 0;
const trip_1 = __importDefault(require("../models/trip"));
// import User from "./models/user";
// Adjust the type if needed
const seedTrip = async (users) => {
    await trip_1.default.deleteMany({}); // clear old data (optional)
    const trips = await trip_1.default.insertMany([
        {
            riverName: "San Juan River",
            startDate: new Date("2024-06-06"),
            endDate: new Date("2024-06-13"),
            putIn: "Sand Island",
            takeOut: "Clay Hills",
            crewNum: 12,
            organizerId: users[0]._id,
        },
        {
            riverName: "Gates of Lodore",
            startDate: new Date("2025-07-06"),
            endDate: new Date("2025-07-11"),
            putIn: "Lodore Ranger Station",
            takeOut: "Split Mountain",
            crewNum: 8,
            organizerId: users[1]._id,
        },
        {
            riverName: "Middle Fork of the Salmon",
            startDate: new Date("2025-05-30"),
            endDate: new Date("2025-06-04"),
            putIn: "Boundary Creek",
            takeOut: "Cache Bar",
            crewNum: 7,
            organizerId: users[2]._id,
        },
    ]);
    console.log("✅ Trips seeded successfully");
    return trips;
};
exports.seedTrip = seedTrip;
