import GearList from "../../models/gearList.js";

export const gearListResolvers = {
    Query: {
        gearListsByTrip: async (_: any, { tripId }: { tripId: string }) => {
            return await GearList.find({ tripId });
        },
    },

    Mutation: {
        createGearList: async (_: any, { input }: any) => {
            const newGearList = await GearList.create(input);
            return newGearList;
        },

        deleteGearList: async (_: any, { id }: { id: string }) => {
            await GearList.findByIdAndDelete(id);
            return "Gear list deleted";
        },
    },
};
