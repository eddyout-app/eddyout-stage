import GearList from "../models/gearList";

export const seedGearLists = async (trips: any[]) => {
  try {
    const gearLists = [];

    // Define categories to match your GearList model
    const categories = [
      "Kitchen",
      "Boat Gear",
      "Camp Gear",
      "Personal",
      "Other",
    ];

    // Create one GearList per category per trip
    for (const trip of trips) {
      for (const category of categories) {
        const newList = await GearList.create({
          tripId: trip._id,
          category,
          description: "", // Optional — you can add real descriptions if you want
        });
        gearLists.push(newList);
      }
    }

    console.log("✅ GearLists seeded successfully.");
    return gearLists;
  } catch (error) {
    console.error("❌ Error seeding GearLists:", error);
    return [];
  }
};
