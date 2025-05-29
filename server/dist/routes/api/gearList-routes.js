"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gearListRouter = void 0;
const express_1 = __importDefault(require("express"));
const gearListController_js_1 = require("../../controllers/gearListController.js");
const router = express_1.default.Router();
exports.gearListRouter = router;
router.get('/', gearListController_js_1.getGearLists);
router.post('/', gearListController_js_1.createGearList);
