import GearItem from "../models/gearItem";
import { v4 as uuidv4 } from "uuid";

export const seedGear = async (users: any[], trips: any[], gearListId?: string) => {
  await GearItem.insertMany([
    {
      gearItem: "Stove",
      quantity: 1,
      claimedBy: users[1]._id,
      tripId: trips[0]._id,
      gearListId: gearListId || uuidv4(),
    },
    {
      gearItem: "Water Jugs",
      quantity: 7,
      claimedBy: users[1]._id,
      tripId: trips[0]._id,
      gearListId: gearListId || uuidv4(),
    },
    {
      gearItem: "Table",
      quantity: 3,
      claimedBy: users[0]._id,
      tripId: trips[0]._id,
      gearListId: gearListId || uuidv4(),
    },
    {
      gearItem: "Groover",
      quantity: 1,
      claimedBy: users[2]._id,
      tripId: trips[0]._id,
      gearListId: gearListId || uuidv4(),
    },
    {
      gearItem: "Toilet Paper Rolls",
      quantity: 5000,
      claimedBy: users[2]._id,
      tripId: trips[0]._id,
      gearListId: gearListId || uuidv4(),
    },
    {
      gearItem: "Sun Shelter",
      quantity: 1,
      claimedBy: users[0]._id,
      tripId: trips[0]._id,
      gearListId: gearListId || uuidv4(),
    },
  ]);
  console.log("✅ GearItems seeded");
};
