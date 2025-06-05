import GearCatalogItem from "../../models/gearCatalogItem.js";

export const gearCatalogResolvers = {
  Query: {
    gearCatalogItems: async () => {
      return await GearCatalogItem.find();
    },
  },

  Mutation: {
    createGearCatalogItem: async (_: any, { input }: any) => {
      return await GearCatalogItem.create(input);
    },

    deleteGearCatalogItem: async (_: any, { id }: { id: string }) => {
      await GearCatalogItem.findByIdAndDelete(id);
      return "Gear catalog item deleted";
    },
  },
};
