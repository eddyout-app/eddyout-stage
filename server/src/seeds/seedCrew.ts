import dotenv from "dotenv";
import db from "../config/connection.js";
import User from "../models/user.js";
import Trip from "../models/trip.js";
import Crew from "../models/crew.js";

// Load env variables
dotenv.config({ path: "../.env" });

// 🚩 Your current userId (from Mongo)
const myUserId = "68421040f16ae725a62d3d63";

// How many other crew members per trip?
const NUM_OTHER_USERS = 2;

async function seedCrew() {
  try {
    await db;

    console.log("Connected to DB!");

    // Get ALL trips
    const trips = await Trip.find({});
    console.log(`Found ${trips.length} trips`);

    // Get ALL users
    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    // Simple check
    const otherUsers = users.filter((u) => u._id.toString() !== myUserId);

    // Loop through trips
    for (const trip of trips) {
      console.log(`\n--- Trip: ${trip.riverName} (${trip._id}) ---`);

      // Check if YOU are already attached to this trip
      const existingMe = await Crew.findOne({
        tripId: trip._id,
        userId: myUserId,
      });

      if (!existingMe) {
        // Add YOU to crew
        await Crew.create({
          tripId: trip._id,
          userId: myUserId,
          role:
            trip.organizerId.toString() === myUserId ? "leader" : "participant",
        });

        console.log(
          `✅ Added YOU to trip as ${trip.organizerId.toString() === myUserId ? "leader" : "participant"
          }`
        );
      } else {
        console.log(`ℹ️ You already attached to trip`);
      }

      // Add N other users
      const existingCrew = await Crew.find({ tripId: trip._id });
      const existingUserIds = existingCrew.map((c) => c.userId.toString());

      // Pick users not already attached
      const toAdd = otherUsers
        .filter((u) => !existingUserIds.includes(u._id.toString()))
        .slice(0, NUM_OTHER_USERS);

      for (const user of toAdd) {
        await Crew.create({
          tripId: trip._id,
          userId: user._id,
          role: "participant",
        });

        console.log(`✅ Added participant: ${user.username} (${user._id})`);
      }
    }

    console.log("\n🎉 Crew seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding crew:", err);
    process.exit(1);
  }
}

seedCrew();
