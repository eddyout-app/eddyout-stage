import User from "../models/user";

export async function seedUsers() {
  await User.deleteMany({});
  try {
    const users = await User.insertMany([
      {
<<<<<<< HEAD
        username: "amania",
        email: "amani@email.com",
        password: "password",
        firstName: "Amani",
        lastName: "Akram",
=======
        username: "justinv1",
        email: "justin@email.com",
        password: "password", // plain text for now
        firstName: "Justin",
        lastName: "Vittitoe",
>>>>>>> main
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
      {
        username: "toulousep",
        email: "toulouse@email.com",
        password: "password",
        firstName: "Toulouse",
        lastName: "Pierre",
      },
      {
        username: "albusd",
        email: "albus@email.com",
        password: "password",
        firstName: "Albus",
        lastName: "Dumbledore",
      },
    ]);

    console.log("✅ Users seeded successfully");
    return users;
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    return [];
  }
}
