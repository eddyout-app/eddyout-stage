import { Trip } from "../models";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user";

export const seedTrip = async (users: User[]) => {
  const trips = await Trip.bulkCreate([
    {
      id: uuidv4(),
      riverName: "San Juan River",
      startDate: "2024-06-06",
      endDate: "2024-06-13",
      putIn: "Sand Island",
      takeOut: "Clay Hills",
      crewNum: 12,
      organizerId: users[0].id,
    },
    {
      id: uuidv4(),
      riverName: "Gates of Lodore",
      startDate: "2025-07-06",
      endDate: "2025-07-11",
      putIn: "Lodore Ranger Station",
      takeOut: "Split Mountain",
      crewNum: 8,
      organizerId: users[1].id,
    },
    {
      id: uuidv4(),
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
