"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripRouter = void 0;
const express_1 = __importDefault(require("express"));
const tripController_js_1 = require("../../controllers/tripController.js");
const router = express_1.default.Router();
exports.tripRouter = router;
router.get("/", tripController_js_1.getAllTrips);
router.get("/:id", tripController_js_1.getTripById);
router.post("/", tripController_js_1.createTrip);
router.put("/:id", tripController_js_1.updateTrip);
router.delete("/:id", tripController_js_1.deleteTrip);
//# sourceMappingURL=trip-routes.js.map