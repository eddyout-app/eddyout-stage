"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSchedule = void 0;
const schedule_1 = require("../models/schedule");
const seedSchedule = async (trips) => {
    await schedule_1.Schedule.bulkCreate([
        {
            date: new Date("2025-05-30"),
            campsite: "Lazy River",
            tripId: trips[0].id,
        },
        {
            date: new Date("2025-05-31"),
            campsite: "Rolling Tides",
            tripId: trips[0].id,
        },
        {
            date: new Date("2025-06-01"),
            campsite: "Happy Beaver",
            tripId: trips[0].id,
        },
    ]);
};
exports.seedSchedule = seedSchedule;
//# sourceMappingURL=schedule-seeds.js.map