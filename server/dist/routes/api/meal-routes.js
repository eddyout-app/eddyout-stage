"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealRouter = void 0;
const express_1 = __importDefault(require("express"));
const mealController_js_1 = require("../../controllers/mealController.js");
const router = express_1.default.Router();
exports.mealRouter = router;
router.get('/:tripId', mealController_js_1.getMealsForTrip);
router.post('/', mealController_js_1.createMeal);
//# sourceMappingURL=meal-routes.js.map