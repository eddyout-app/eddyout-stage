import GearCatalogItem from "../models/gearCatalogItem";

export const seedGearCatalog = async () => {
  try {
    await GearCatalogItem.insertMany([
      {
        itemName: "Toilet Paper Rolls",
        category: "Personal",
        perPersonQty: 5,
        unit: "rolls",
        notes: "Plan for extra",
      },
      {
        itemName: "Groover",
        category: "Camp Gear",
        perPersonQty: 0.1,
        unit: "units",
        notes: "Usually one per group",
      },
      {
        itemName: "Water Jugs",
        category: "Boat Gear",
        perPersonQty: 2,
        unit: "gallons",
        notes: "",
      },
      {
        itemName: "Table",
        category: "Camp Gear",
        perPersonQty: 0.25,
        unit: "tables",
        notes: "",
      },
      // Add more from spreadsheet...
    ]);

    console.log("✅ GearCatalogItems seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding GearCatalogItems:", error);
  }
};
