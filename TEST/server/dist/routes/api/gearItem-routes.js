"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gearItemRouter = void 0;
const express_1 = __importDefault(require("express"));
const gearItemController_js_1 = require("../../controllers/gearItemController.js");
const router = express_1.default.Router();
exports.gearItemRouter = router;
router.get('/', gearItemController_js_1.getAllGearItems);
router.post('/', gearItemController_js_1.createGearItem);
