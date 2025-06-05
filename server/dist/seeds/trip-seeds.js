"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTrip = void 0;
const models_1 = require("../models");
const uuid_1 = require("uuid");
const seedTrip = async (users) => {
    const trips = await models_1.Trip.bulkCreate([
        {
            id: (0, uuid_1.v4)(),
            riverName: "San Juan River",
            startDate: "2024-06-06",
            endDate: "2024-06-13",
            putIn: "Sand Island",
            takeOut: "Clay Hills",
            crewNum: 12,
            organizerId: users[0].id,
        },
        {
            id: (0, uuid_1.v4)(),
            riverName: "Gates of Lodore",
            startDate: "2025-07-06",
            endDate: "2025-07-11",
            putIn: "Lodore Ranger Station",
            takeOut: "Split Mountain",
            crewNum: 8,
            organizerId: users[1].id,
        },
        {
            id: (0, uuid_1.v4)(),
            riverName: "Middle Fork of the Salmon",
            startDate: "2025-05-30",
            endDate: "2025-06-04",
            putIn: "Boundary Creek",
            takeOut: "Cache Bar",
            crewNum: 7,
            organizerId: users[2].id,
        },
    ]);
    console.log("Trips seeded successfully");
    return trips;
};
exports.seedTrip = seedTrip;
//# sourceMappingURL=trip-seeds.js.map