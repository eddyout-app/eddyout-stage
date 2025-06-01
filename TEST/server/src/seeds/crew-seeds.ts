import { Crew } from "../models/crew";
import type { User } from "../models/user";
import type { Trip } from "../models/trip";

export const seedCrew = async (users: User[], trips: Trip[]) => {
  try {
    await Crew.bulkCreate([
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
  } catch (error) {
    console.error("Error seeding crew data:", error);
  }
};
