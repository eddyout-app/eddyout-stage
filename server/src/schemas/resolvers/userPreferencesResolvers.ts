import UserPreferences from "../../models/userPreferences.js"; // UserPreferences model
import User from "../../models/user.js"; // User model

const userPreferencesResolvers = {
    Query: {
        // Fetch User Preferences based on userId
        getUserPreferences: async (_: any, { userId }: { userId: string }) => {
            try {
                // Find the user by userId and populate the userPreferences field
                const user = await User.findById(userId).populate("userPreferences");

                const userPreferences = user?.get('userPreferences');
                if (!user || !userPreferences) {
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
        // Update or create User Preferences for a user
        updateUserPreferences: async (
            _: any,
            { userId, dietaryRestrictions, venmoHandle }: { userId: string; dietaryRestrictions: string[]; venmoHandle: string }
        ) => {
            try {
                // Find user by userId
                const user = await User.findById(userId);

                if (!user) {
                    throw new Error("User not found");
                }

                // Check if user already has preferences
                let userPreferences = (user as any).userPreferences;

                if (!userPreferences) {
                    // Create new UserPreferences if not already present
                    userPreferences = new UserPreferences({
                        dietaryRestrictions,
                        venmoHandle,
                    });

                    await userPreferences.save(); // Save the new UserPreferences
                    (user as any).userPreferences = userPreferences._id; // Link UserPreferences to the User
                } else {
                    // Update existing UserPreferences
                    userPreferences.dietaryRestrictions = dietaryRestrictions;
                    userPreferences.venmoHandle = venmoHandle;
                    await userPreferences.save(); // Save the updated UserPreferences
                }

                await user.save(); // Save the User document with the updated reference to UserPreferences
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
