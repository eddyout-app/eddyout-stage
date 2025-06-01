import express from "express";
import {
  getSchedules,
  createSchedule,
  updateScheduleById,
} from "../../controllers/scheduleController.js";

import { authenticateToken } from "../../middleware/auth.js";

const router = express.Router();
router.get("/", getSchedules);
router.post("/", createSchedule);
router.put("/:id", authenticateToken, updateScheduleById);

export { router as scheduleRouter };
