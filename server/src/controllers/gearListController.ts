import { Request, Response } from "express";
import { GearList } from "../models/gearList.js";

export const getGearLists = async (_req: Request, res: Response) => {
  try {
    const lists = await GearList.findAll();
    res.json(lists);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createGearList = async (req: Request, res: Response) => {
  try {
    const list = await GearList.create(req.body);
    res.status(201).json(list);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
