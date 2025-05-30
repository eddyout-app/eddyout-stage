import User from "../models/user";

export const seedUsers = async () => {
  const users = await User.insertMany([
    {
      username: "justinv",
      email: "justin@email.com",
      password: "password",
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
  console.log("✅ Users seeded");
  return users;
};
