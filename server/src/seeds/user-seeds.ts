import User from "../models/user";

export const seedUsers = async () => {
  try {
    const users = await User.insertMany([
      {
        username: "justinv",
        email: "justin@email.com",
        password: "password", // plain text for now
        firstName: "Justin",
        lastName: "Vittitoe",
      },
      {
        username: "lisaj",
        email: "lisa@email.com",
        password: "password",
        firstName: "Lisa",
        lastName: "Jorgensen",
      },
      {
        username: "ellim",
        email: "elli@email.com",
        password: "password",
        firstName: "Elli",
        lastName: "Mckinley",
      },
    ]);

    console.log("✅ Users seeded successfully");
    return users;
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    return [];
  }
};
