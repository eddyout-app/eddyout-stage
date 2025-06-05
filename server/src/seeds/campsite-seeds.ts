import Campsites from "../models/campsites";
import Trip from "../models/trip";

export const seedCampsites = async (trips: Trip[]) => {
    await Campsites.insertMany([
        {
            date: new Date("2025-05-30"),
            campsite: "Lazy River",
            tripId: trips[0].id,
        },
        {
            date: new Date("2025-05-31"),
            campsite: "Rolling Tides",
            tripId: trips[0].id,
        },
        {
            date: new Date("2025-06-01"),
            campsite: "Happy Beaver",
            tripId: trips[0].id,
        },
    ]);
};
