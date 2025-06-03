"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedGear = void 0;
const gearItem_js_1 = require("../models/gearItem.js");
const uuid_1 = require("uuid");
const seedGear = async (users, trips, gearLists) => {
    try {
        await gearItem_js_1.GearItem.bulkCreate([
            {
                gearItem: "Stove",
                quantity: 1,
                claimedBy: users[1].id,
                tripId: trips[0].id,
                gearListId: gearLists?.[0]?.id ?? (0, uuid_1.v4)(),
            },
            {
                gearItem: "Water Jugs",
                quantity: 7,
                claimedBy: users[1].id,
                tripId: trips[0].id,
                gearListId: gearLists?.[0]?.id ?? (0, uuid_1.v4)(),
            },
            {
                gearItem: "Table",
                quantity: 3,
                claimedBy: users[0].id,
                tripId: trips[0].id,
                gearListId: gearLists?.[0]?.id ?? (0, uuid_1.v4)(),
            },
            {
                gearItem: "Groover",
                quantity: 1,
                claimedBy: users[2].id,
                tripId: trips[0].id,
                gearListId: gearLists?.[0]?.id ?? (0, uuid_1.v4)(),
            },
            {
                gearItem: "Toilet Paper Rolls",
                quantity: 5000,
                claimedBy: users[2].id,
                tripId: trips[0].id,
                gearListId: gearLists?.[0]?.id ?? (0, uuid_1.v4)(),
            },
            {
                gearItem: "Sun Shelter",
                quantity: 1,
                claimedBy: users[0].id,
                tripId: trips[0].id,
                gearListId: gearLists?.[0]?.id ?? (0, uuid_1.v4)(),
            },
        ]);
        console.log("GearItems seeded successfully.");
    }
    catch (error) {
        console.error("Error seeding GearItems:", error);
    }
};
exports.seedGear = seedGear;
//# sourceMappingURL=gear-seeds.js.map