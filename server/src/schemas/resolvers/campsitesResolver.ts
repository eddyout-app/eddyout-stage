import Campsites from "../../models/campsites";
interface CampsitesArgs {
  tripId: string;
}

export const campsitesResolvers = {
  Query: {
    campsites: async (_parent: any, { tripId }: CampsitesArgs) => {
      return await Campsites.find({ tripId });
    },
  },

  Mutation: {
    addCampsite: async (_parent: any, args: any) => {
      try {
        const newCampsite = new Campsites({
          tripId: args.tripId,
          userId: args.userId,
          name: args.name,
          description: args.description,
          location: args.location,
          startDate: args.startDate,
          endDate: args.endDate,
          weather: args.weather,
        });
        return await newCampsite.save();
      } catch (err) {
        console.error("Error adding campsite:", err);
        throw new Error("Failed to add campsite");
      }
    },

    updateCampsite: async (_parent: any, args: any) => {
      try {
        const updatedCampsite = await Campsites.findByIdAndUpdate(
          args.campsiteId,
          {
            name: args.name,
            description: args.description,
            location: args.location,
            startDate: args.startDate,
            endDate: args.endDate,
            weather: args.weather,
          },
          { new: true }
        );
        return updatedCampsite;
      } catch (err) {
        console.error("Error updating campsite:", err);
        throw new Error("Failed to update campsite");
      }
    },

    deleteCampsite: async (
      _parent: any,
      { campsiteId }: { campsiteId: string }
    ) => {
      try {
        const result = await Campsites.findByIdAndDelete(campsiteId);
        return !!result;
      } catch (err) {
        console.error("Error deleting campsite:", err);
        throw new Error("Failed to delete campsite");
      }
    },
  },
};
