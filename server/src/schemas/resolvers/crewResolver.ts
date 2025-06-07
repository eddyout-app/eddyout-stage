import Crew from "../../models/crew.js";

export const crewResolvers = {
  Query: {
    crewByTrip: async (_parent: any, { tripId }: { tripId: string }) => {
      return await Crew.find({ tripId }).populate("userId");
    },
  },

  Mutation: {
    assignCrewMember: async (_parent: any, { crewId, userId, role }: any) => {
      const updatedCrew = await Crew.findByIdAndUpdate(
        crewId,
        {
          userId,
          role,
        },
        { new: true }
      ).populate("userId");

      return updatedCrew;
    },

    updateCrewMember: async (_parent: any, { crewId, userId, role }: any) => {
      const updatedCrew = await Crew.findByIdAndUpdate(
        crewId,
        {
          userId,
          role,
        },
        { new: true }
      ).populate("userId");

      return updatedCrew;
    },

    assignOrUpdateCrewMember: async (
      _parent: any,
      { crewId, userId, role }: any
    ) => {
      const updatedCrew = await Crew.findByIdAndUpdate(
        crewId,
        {
          userId,
          role,
        },
        { new: true }
      ).populate("userId");

      return updatedCrew;
    },
  },
};
