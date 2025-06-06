import Trip from "../models/trip";
import { Types } from "mongoose";

export const seedTrip = async (users: { _id: Types.ObjectId }[]) => {
  await Trip.deleteMany({});

  const trips = await Trip.insertMany([
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
    {
      riverName: "Rogue River",
      startDate: new Date("2023-09-10"),
      endDate: new Date("2023-09-15"),
      putIn: "Grave Creek",
      takeOut: "Foster Bar",
      crewNum: 10,
      organizerId: users[3]._id,
    },
    {
      riverName: "Colorado through the Grand Canyon",
      startDate: new Date("2025-09-01"),
      endDate: new Date("2025-09-18"),
      putIn: "Lees Ferry",
      takeOut: "Diamond Creek",
      crewNum: 16,
      organizerId: users[1]._id,
    },
  ]);

  console.log("✅ Trips seeded successfully");
  return trips;
};
