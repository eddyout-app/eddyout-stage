import Meal from "../../models/meals.js";

export const mealResolvers = {
  Query: {
    mealsByTrip: async (_parent: any, { tripId }: { tripId: string }) => {
      const meals = await Meal.find({ tripId }).populate("userId");
      return meals;
    },
  },

  Mutation: {
    addMeal: async (
      _parent: any,
      { tripId, date, mealType, userId, mealName }: any
    ) => {
      const newMeal = await Meal.create({
        tripId,
        date,
        mealType,
        userId,
        mealName,
      });

      // Populate userId to match your front-end selection set
      const populatedMeal = await Meal.findById(newMeal._id).populate("userId");

      return populatedMeal;
    },

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
