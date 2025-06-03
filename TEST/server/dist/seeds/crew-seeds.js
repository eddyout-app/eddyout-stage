"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCrew = void 0;
const crew_1 = require("../models/crew");
const seedCrew = async (users, trips) => {
    try {
        await crew_1.Crew.bulkCreate([
            {
                userId: users[0].id,
                tripId: trips[0].id,
            },
            {
                userId: users[1].id,
                tripId: trips[0].id,
            },
            {
                userId: users[2].id,
                tripId: trips[0].id,
            },
        ]);
        console.log("Crew seed data inserted successfully.");
    }
    catch (error) {
        console.error("Error seeding crew data:", error);
    }
};
exports.seedCrew = seedCrew;
//# sourceMappingURL=crew-seeds.js.map