import UserPreferences from "../models/userPreferences.js"; // Import UserPreferences model

const userPreferencesSeed = async () => {
    try {
        // Create sample user preferences
        const preferences1 = new UserPreferences({
            dietaryRestrictions: ["Vegan", "Gluten-Free"],
            venmoHandle: "@tom123",
        });

        const preferences2 = new UserPreferences({
            dietaryRestrictions: ["Vegetarian"],
            venmoHandle: "@jerry123",
        });

        const preferences3 = new UserPreferences({
            dietaryRestrictions: ["Dairy-Free", "Nut-Free"],
            venmoHandle: "@allergenfreak",
        });

        // Save preferences to the database
        await preferences1.save();
        await preferences2.save();
        await preferences3.save();

        console.log("User preferences seeded successfully");
    } catch (error) {
        console.error("Error seeding user preferences:", error);
    }
};

export default userPreferencesSeed;
