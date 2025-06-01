import { Router } from "express";
import { crewRouter } from "./crew-routes.js";
import { gearItemRouter } from "./gearItem-routes.js";
import { gearListRouter } from "./gearList-routes.js";
import { mealRouter } from "./meal-routes.js";
import { scheduleRouter } from "./schedule-routes.js";
import { tripRouter } from "./trip-routes.js";
import { userRouter } from "./user-routes.js";


const router = Router();

router.use("/trips/crew", crewRouter);
router.use("/gear", gearListRouter);
router.use("/meals", mealRouter);
router.use("/trips", tripRouter);
router.use("/users", userRouter);
router.use("/gear/:id", gearItemRouter)
router.use("/schedule/:id", scheduleRouter)

export default router;
