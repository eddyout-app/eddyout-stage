"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGearList = exports.getGearLists = void 0;
const gearList_js_1 = require("../models/gearList.js");
const getGearLists = async (_req, res) => {
    try {
        const lists = await gearList_js_1.GearList.findAll();
        res.json(lists);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getGearLists = getGearLists;
const createGearList = async (req, res) => {
    try {
        const list = await gearList_js_1.GearList.create(req.body);
        res.status(201).json(list);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createGearList = createGearList;
