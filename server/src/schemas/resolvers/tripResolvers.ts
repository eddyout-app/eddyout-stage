import Trip from "../../models/trip";


export const tripResolvers = {
    Query: {
        trips: async () => await Trip.find(),

        trip: async (_: any, { id }: { id: string }) => {
            return await Trip.findById(id);
        }
    },

    Mutation: {
        createTrip: async (_: any, args: any) => {
            const newTrip = await Trip.create({ ...args });
            return newTrip;
        },

        updateTrip: async (_: any, { id, ...updates }: any) => {
            const updatedTrip = await Trip.findByIdAndUpdate(id, updates, {
                new: true,
                runValidators: true
            });
            return updatedTrip;
        },

        deleteTrip: async (_: any, { id }: { id: string }) => {
            await Trip.findByIdAndDelete(id);
            return "Trip deleted";
        }
    }
};
