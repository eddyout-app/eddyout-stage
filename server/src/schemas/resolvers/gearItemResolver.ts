import GearItem from "../../models/gearItem.js";

export const gearItemResolvers = {
    Query: {
        gearItemsByTrip: async (_: any, { tripId }: { tripId: string }) => {
            return await GearItem.find({ tripId });
        },
        gearItemsByGearList: async (_: any, { gearListId }: { gearListId: string }) => {
            return await GearItem.find({ gearListId });
        },
    },

    Mutation: {
        createGearItem: async (_: any, { input }: any) => {
            return await GearItem.create(input);
        },

        updateGearItem: async (_: any, { id, input }: any) => {
            return await GearItem.findByIdAndUpdate(id, input, {
                new: true,
                runValidators: true,
            });
        },

        deleteGearItem: async (_: any, { id }: { id: string }) => {
            await GearItem.findByIdAndDelete(id);
            return "Gear item deleted";
        },
    },
};
