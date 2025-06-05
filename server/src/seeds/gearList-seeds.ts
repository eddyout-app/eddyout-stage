import GearList from "../models/gearList.js";

export const seedGearLists = async (trips: any[]) => {
  try {
    const gearLists = [];

    for (const trip of trips) {
      const newList = await GearList.create({ tripId: trip._id });
      gearLists.push(newList);
    }

    console.log("✅ GearLists seeded successfully.");
    return gearLists;
  } catch (error) {
    console.error("❌ Error seeding GearLists:", error);
    return [];
  }
};
