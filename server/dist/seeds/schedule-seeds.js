import Schedule from "../models/schedule";

export const seedSchedule = async (trips: any[]) => {
  await Schedule.insertMany([
    {
      date: new Date("2025-05-30"),
      campsite: "Lazy River",
      tripId: trips[0]._id,
    },
    {
      date: new Date("2025-05-31"),
      campsite: "Rolling Tides",
      tripId: trips[0]._id,
    },
    {
      date: new Date("2025-06-01"),
      campsite: "Happy Beaver",
      tripId: trips[0]._id,
    },
  ]);
  console.log("✅ Schedule seeded");
};