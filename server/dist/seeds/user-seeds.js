"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUser = void 0;
const user_1 = require("../models/user");
const uuid_1 = require("uuid");
const seedUser = async () => {
    const users = await user_1.User.bulkCreate([
        {
            id: (0, uuid_1.v4)(),
            username: "justinv",
            email: "justin@email.com",
            password: "password",
            firstName: "Justin",
            lastName: "Vittitoe",
        },
        {
            id: (0, uuid_1.v4)(),
            username: "lisaj",
            email: "lisa@email.com",
            password: "password",
            firstName: "Lisa",
            lastName: "Jorgensen",
        },
        {
            id: (0, uuid_1.v4)(),
            username: "ellim",
            email: "elli@email.com",
            password: "password",
            firstName: "Elli",
            lastName: "Mckinley",
        },
    ], { individualHooks: true });
    console.log("Users seeded successfully");
    return users;
};
exports.seedUser = seedUser;
