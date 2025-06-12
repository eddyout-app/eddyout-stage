import UserPreferences from "../../models/userPreferences.js";

const userPreferencesResolvers = {
  Query: {
    getUserPreferences: async (_parent: any, args: { _id: string }) => {
      const { _id } = args;

      try {
        const userPreferences = await UserPreferences.findOne({
          userId: _id,
        });
        if (!userPreferences) {
          console.log("⚠️ No preferences found for this user.");
          return null;
        }
        return userPreferences;
      } catch (error) {
        throw new Error("Error fetching user preferences:" + error);
      }
    },
  },

  Mutation: {
    updateUserPreferences: async (
      _parent: any,
      {
        id,
        dietaryRestrictions,
        phone,
        allergies,
        medicalConditions,
        emergencyContactName,
        emergencyContactPhone,
        medicalTraining,
        preferredPaymentMethod,
        paymentHandle,
        avatar,
      }: any
    ) => {
      let updatedUserPreferences = await UserPreferences.findOneAndUpdate(
        { userId: id },
        {
          dietaryRestrictions,
          phone,
          allergies,
          medicalConditions,
          emergencyContactName,
          emergencyContactPhone,
          medicalTraining: medicalTraining || undefined,
          preferredPaymentMethod,
          paymentHandle,
          avatar,
        },
        { new: true }
      );

      // 🔁 Fallback: If no existing preferences, create them now
      if (!updatedUserPreferences) {
        updatedUserPreferences = new UserPreferences({
          userId: id,
          dietaryRestrictions,
          phone,
          allergies,
          medicalConditions,
          emergencyContactName,
          emergencyContactPhone,
          medicalTraining: medicalTraining || undefined,
          preferredPaymentMethod,
          paymentHandle,
          avatar,
        });
        await updatedUserPreferences.save();
      }

      return updatedUserPreferences;
    },
  },
};

export default userPreferencesResolvers;
