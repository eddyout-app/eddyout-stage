import Crew from "../models/crew";

export const seedCrew = async (users: any[], trips: any[]) => {
  try {
    await Crew.deleteMany({});
    console.log("✅ Existing Crew cleared");

    const crewData = [
      // Lisa as Trip Leader on Trip 1
      {
        userId: users.find((u) => u.username === "lisaj")._id,
        tripId: trips[0]._id,
        role: "Trip Leader",
      },
      // Lisa as Crew on Trip 2
      {
        userId: users.find((u) => u.username === "lisaj")._id,
        tripId: trips[1]._id,
        role: "Safety Officer",
      },
      // Lisa as Navigator on Trip 3
      {
        userId: users.find((u) => u.username === "lisaj")._id,
        tripId: trips[2]._id,
        role: "Navigator",
      },
      // Lisa as Photographer on Trip 4
      {
        userId: users.find((u) => u.username === "lisaj")._id,
        tripId: trips[3]._id,
        role: "Photographer",
      },
      // Lisa as Cook on Trip 5
      {
        userId: users.find((u) => u.username === "lisaj")._id,
        tripId: trips[4]._id,
        role: "Cook",
      },

      // Other crew sprinkled in:

      {
        userId: users.find((u) => u.username === "amania")._id,
        tripId: trips[0]._id,
        role: "Cook",
      },
      {
        userId: users.find((u) => u.username === "ellim")._id,
        tripId: trips[1]._id,
        role: "Navigator",
      },
      {
        userId: users.find((u) => u.username === "toulousep")._id,
        tripId: trips[2]._id,
        role: "Safety Lead",
      },
      {
        userId: users.find((u) => u.username === "albusd")._id,
        tripId: trips[3]._id,
        role: "Wizard",
      },
      {
        userId: users.find((u) => u.username === "amania")._id,
        tripId: trips[4]._id,
        role: "Medic",
      },
    ];

    const createdCrew = await Crew.insertMany(crewData);
    console.log(`✅ ${createdCrew.length} Crew members seeded`);

    return createdCrew;
  } catch (error) {
    console.error("❌ Error seeding crew:", error);
    throw error;
  }
};
