import { Request, Response } from 'express';
import { GearItem } from '../models/gearItem.js';

export const getAllGearItems = async (_req: Request, res: Response) => {
    try {
        const items = await GearItem.findAll();
        res.json(items);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const createGearItem = async (req: Request, res: Response) => {
    try {
        const item = await GearItem.create(req.body);
        res.status(201).json(item);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};