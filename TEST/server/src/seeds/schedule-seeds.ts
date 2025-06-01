import { Schedule } from "../models/schedule";
import { Trip } from "../models/trip";

export const seedSchedule = async (trips: Trip[]) => {
  await Schedule.bulkCreate([
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
