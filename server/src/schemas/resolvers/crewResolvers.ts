import Crew from "../../models/crew.js";

export const crewResolvers = {
  Query: {
    crewByTrip: async (_parent: any, { tripId }: { tripId: string }) => {
      const crew = await Crew.find({ tripId }).populate("userId");
      console.log("Crew by trip:", JSON.stringify(crew, null, 2));
      return crew;
    },
  },

  Mutation: {
    addCrewMember: async (
      _parent: any,
      {
        tripId,
        userId,
        role,
      }: { tripId: string; userId: string; role?: string }
    ) => {
      const newCrew = await Crew.create({
        tripId,
        userId,
        role,
      });

      const populatedCrew = await Crew.findById(newCrew._id).populate("userId");
      return populatedCrew;
    },

    updateCrewMember: async (
      _parent: any,
      { crewId, role }: { crewId: string; role: string }
    ) => {
      const updatedCrew = await Crew.findByIdAndUpdate(
        crewId,
        { role },
        { new: true }
      ).populate("userId");

      return updatedCrew;
    },

    removeCrewMember: async (_parent: any, { crewId }: { crewId: string }) => {
      const result = await Crew.findByIdAndDelete(crewId);
      return !!result;
    },
  },
};
