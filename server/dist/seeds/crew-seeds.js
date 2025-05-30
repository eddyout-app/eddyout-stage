import Crew from "../models/crew";

export const seedCrew = async (users: any[], trips: any[]) => {
  await Crew.insertMany([
    { userId: users[0]._id, tripId: trips[0]._id },
    { userId: users[1]._id, tripId: trips[0]._id },
    { userId: users[2]._id, tripId: trips[0]._id },
  ]);
  console.log("✅ Crew seeded");
};