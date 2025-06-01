import { GearItem } from "../models/gearItem.js";
import type { User } from "../models/user.js";
import type { GearList } from "../models/gearList.js";
import { v4 as uuidv4 } from "uuid";
import type { Trip } from "../models/trip.js";

export const seedGear = async (
  users: User[],
  trips: Trip[],
  gearLists?: GearList[]
) => {
  try {
    await GearItem.bulkCreate([
      {
        gearItem: "Stove",
        quantity: 1,
        claimedBy: users[1].id,
        tripId: trips[0].id,
        gearListId: gearLists?.[0]?.id ?? uuidv4(),
      },
      {
        gearItem: "Water Jugs",
        quantity: 7,
        claimedBy: users[1].id,
        tripId: trips[0].id,
        gearListId: gearLists?.[0]?.id ?? uuidv4(),
      },
      {
        gearItem: "Table",
        quantity: 3,
        claimedBy: users[0].id,
        tripId: trips[0].id,
        gearListId: gearLists?.[0]?.id ?? uuidv4(),
      },
      {
        gearItem: "Groover",
        quantity: 1,
        claimedBy: users[2].id,
        tripId: trips[0].id,
        gearListId: gearLists?.[0]?.id ?? uuidv4(),
      },
      {
        gearItem: "Toilet Paper Rolls",
        quantity: 5000,
        claimedBy: users[2].id,
        tripId: trips[0].id,
        gearListId: gearLists?.[0]?.id ?? uuidv4(),
      },
      {
        gearItem: "Sun Shelter",
        quantity: 1,
        claimedBy: users[0].id,
        tripId: trips[0].id,
        gearListId: gearLists?.[0]?.id ?? uuidv4(),
      },
    ]);
    console.log("GearItems seeded successfully.");
  } catch (error) {
    console.error("Error seeding GearItems:", error);
  }
};
