import UserPreferences from "../../models/userPreferences.js";
import User from "../../models/user.js";

const userPreferencesResolvers = {
  Query: {
    getUserPreferences: async (_: any, { userId }: { userId: string }) => {
      try {
        const userPreferences = await UserPreferences.findOne({ userId });

        if (!userPreferences) {
          throw new Error("User preferences not found");
        }

        return userPreferences;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error("Error fetching user preferences: " + error.message);
        } else {
          throw new Error("Error fetching user preferences: " + String(error));
        }
      }
    },
  },

  Mutation: {
    updateUserPreferences: async (
      _: any,
      {
        userId,
        dietaryRestrictions,
        venmoHandle,
        phone,
        allergies,
        medicalConditions,
        emergencyContactName,
        emergencyContactPhone,
        medicalTraining,
        preferredPaymentMethod,
        paymentHandle,
        avatar,
      }: {
        userId: string;
        dietaryRestrictions: string[];
        venmoHandle: string;
        phone: string;
        allergies: string;
        medicalConditions: string;
        emergencyContactName: string;
        emergencyContactPhone: string;
        medicalTraining: boolean;
        preferredPaymentMethod: string;
        paymentHandle: string;
        avatar: string;
      }
    ) => {
      try {
        const user = await User.findById(userId);

        if (!user) {
          throw new Error("User not found");
        }

        let userPreferences = await UserPreferences.findOne({ userId });

        if (!userPreferences) {
          // Create new preferences
          userPreferences = new UserPreferences({
            userId, // IMPORTANT!
            dietaryRestrictions,
            venmoHandle,
            phone,
            allergies,
            medicalConditions,
            emergencyContactName,
            emergencyContactPhone,
            medicalTraining,
            preferredPaymentMethod,
            paymentHandle,
            avatar,
          });

          await userPreferences.save();
        } else {
          // Update existing preferences
          userPreferences.dietaryRestrictions = dietaryRestrictions;
          userPreferences.venmoHandle = venmoHandle;
          userPreferences.phone = phone;
          userPreferences.allergies = allergies;
          userPreferences.medicalConditions = medicalConditions;
          userPreferences.emergencyContactName = emergencyContactName;
          userPreferences.emergencyContactPhone = emergencyContactPhone;
          userPreferences.medicalTraining = medicalTraining;
          userPreferences.preferredPaymentMethod = preferredPaymentMethod;
          userPreferences.paymentHandle = paymentHandle;
          userPreferences.avatar = avatar;

          await userPreferences.save();
        }

        return userPreferences;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error("Error updating user preferences: " + error.message);
        } else {
          throw new Error("Error updating user preferences: " + String(error));
        }
      }
    },
  },
};

export default userPreferencesResolvers;
