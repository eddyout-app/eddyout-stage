import { Request, Response } from "express";
import { Schedule } from "../models/schedule.js";

export const getSchedules = async (_req: Request, res: Response) => {
  try {
    const schedules = await Schedule.findAll();
    res.json(schedules);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateScheduleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { campsite } = req.body;

  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      res.status(404).json({ error: "Schedule item not found" });
      return; //
    }

    schedule.campsite = campsite;
    await schedule.save();

    res.json(schedule);
    return;
  } catch (err) {
    res.status(500).json({ error: "Failed to update schedule item" });
    return;
  }
};
