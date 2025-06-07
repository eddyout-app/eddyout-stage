import Trip from "../../models/trip.js";
import Crew from "../../models/crew.js"; // 🚩 You need this!
import mongoose from "mongoose";

export const tripResolvers = {
  Query: {
    trips: async (_: any, { userId }: { userId: string }) => {
      // 1️⃣ Trips where user is organizer
      const organizerTrips = await Trip.find({
        organizerId: new mongoose.Types.ObjectId(userId),
      });

      // 2️⃣ Trips where user is crew
      const crewEntries = await Crew.find({
        userId: new mongoose.Types.ObjectId(userId),
      });

      const crewTripIds = crewEntries.map((entry) => entry.tripId);

      const crewTrips = await Trip.find({
        _id: { $in: crewTripIds },
      });

      // 3️⃣ Combine both lists, deduplicate
      const allTripsMap = new Map();

      organizerTrips.forEach((trip) =>
        allTripsMap.set(trip._id.toString(), trip)
      );

      crewTrips.forEach((trip) => allTripsMap.set(trip._id.toString(), trip));

      // 4️⃣ Return as array
      return Array.from(allTripsMap.values());
    },

    trip: async (_: any, { id }: { id: string }) => {
      return await Trip.findById(id);
    },
  },

  Mutation: {
    createTrip: async (_: any, args: any) => {
      const newTrip = await Trip.create({ ...args });
      return newTrip;
    },

    updateTrip: async (_: any, { id, ...updates }: any) => {
      const updatedTrip = await Trip.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
      return updatedTrip;
    },

    deleteTrip: async (_: any, { id }: { id: string }) => {
      await Trip.findByIdAndDelete(id);
      return "Trip deleted";
    },
  },

  Trip: {
    startDate: (trip: { startDate: Date }) =>
      new Date(trip.startDate).toISOString().split("T")[0],
    endDate: (trip: { endDate: Date }) =>
      new Date(trip.endDate).toISOString().split("T")[0],
  },
};
