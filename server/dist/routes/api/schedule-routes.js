"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRouter = void 0;
const express_1 = __importDefault(require("express"));
const scheduleController_js_1 = require("../../controllers/scheduleController.js");
const auth_js_1 = require("../../middleware/auth.js");
const router = express_1.default.Router();
exports.scheduleRouter = router;
router.get("/", scheduleController_js_1.getSchedules);
router.post("/", scheduleController_js_1.createSchedule);
router.put("/:id", auth_js_1.authenticateToken, scheduleController_js_1.updateScheduleById);
//# sourceMappingURL=schedule-routes.js.map