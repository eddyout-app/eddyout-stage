"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGearItem = exports.getAllGearItems = void 0;
const gearItem_js_1 = require("../models/gearItem.js");
const getAllGearItems = async (_req, res) => {
    try {
        const items = await gearItem_js_1.GearItem.findAll();
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllGearItems = getAllGearItems;
const createGearItem = async (req, res) => {
    try {
        const item = await gearItem_js_1.GearItem.create(req.body);
        res.status(201).json(item);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createGearItem = createGearItem;
//# sourceMappingURL=gearItemController.js.map