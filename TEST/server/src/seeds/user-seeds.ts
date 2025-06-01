import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";

export const seedUser = async () => {
  const users = await User.bulkCreate(
    [
      {
        id: uuidv4(),
        username: "justinv",
        email: "justin@email.com",
        password: "password",
        firstName: "Justin",
        lastName: "Vittitoe",
      },
      {
        id: uuidv4(),
        username: "lisaj",
        email: "lisa@email.com",
        password: "password",
        firstName: "Lisa",
        lastName: "Jorgensen",
      },
      {
        id: uuidv4(),
        username: "ellim",
        email: "elli@email.com",
        password: "password",
        firstName: "Elli",
        lastName: "Mckinley",
      },
    ],
    { individualHooks: true }
  );

  console.log("Users seeded successfully");
  return users;
};
