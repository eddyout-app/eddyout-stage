"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_js_1 = require("../models/user.js");
const getUsers = async (_req, res) => {
    try {
        const users = await user_js_1.User.findAll();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const user = await user_js_1.User.findByPk(id);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getUser = getUser;
const createUser = async (req, res) => {
    try {
        const user = await user_js_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map