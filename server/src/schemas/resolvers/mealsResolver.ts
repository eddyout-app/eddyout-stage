import Meal from "../../models/meals";

export const mealResolvers = {
  Query: {
    mealsByTrip: async (_parent: any, { tripId }: { tripId: string }) => {
      return await Meal.find({ tripId }).populate("userId");
    },
  },

  Mutation: {
    claimMeal: async (_parent: any, { mealId, userId, mealName }: any) => {
      const updatedMeal = await Meal.findByIdAndUpdate(
        mealId,
        {
          userId,
          mealName,
        },
        { new: true }
      ).populate("userId");

      return updatedMeal;
    },

    updateMeal: async (_parent: any, { mealId, userId, mealName }: any) => {
      const updatedMeal = await Meal.findByIdAndUpdate(
        mealId,
        {
          userId,
          mealName,
        },
        { new: true }
      ).populate("userId");

      return updatedMeal;
    },

    claimOrUpdateMeal: async (
      _parent: any,
      { mealId, userId, mealName }: any
    ) => {
      const updatedMeal = await Meal.findByIdAndUpdate(
        mealId,
        {
          userId,
          mealName,
        },
        { new: true }
      ).populate("userId");

      return updatedMeal;
    },
  },
};
