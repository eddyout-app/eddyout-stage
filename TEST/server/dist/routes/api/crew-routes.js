"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crewRouter = void 0;
const express_1 = __importDefault(require("express"));
const crewControllers_js_1 = require("../../controllers/crewControllers.js");
const router = express_1.default.Router();
exports.crewRouter = router;
router.get('/:tripId', crewControllers_js_1.getAllCrew);
router.post('/create', crewControllers_js_1.createCrew);
router.delete('/:crewId', crewControllers_js_1.deleteCrew);
//# sourceMappingURL=crew-routes.js.map