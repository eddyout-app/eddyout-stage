import { Request, Response } from "express";
import { Trip } from "../models/trip.js";

export const getAllTrips = async (_req: Request, res: Response) => {
    try {
        const trips = await Trip.findAll();
        res.json(trips);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getTripById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const trip = await Trip.findByPk(id);
        if (trip) {
            res.json(trip);
        } else {
            res.status(404).json({ message: "Trip not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const createTrip = async (req: Request, res: Response): Promise<void> => {
    const { riverName, startDate, endDate, putIn, takeOut, crewNum, organizerId } = req.body;

    if (!riverName || !startDate || !endDate || !putIn || !takeOut || !crewNum) {
        res.status(400).json({ message: "All fields are required" });
        return
    }


    try {
        const newTrip = await Trip.create({
            riverName,
            startDate,
            endDate,
            putIn,
            takeOut,
            crewNum,
            organizerId,
        });
        res.status(201).json(newTrip);
    } catch (error: any) {
        console.error(error);  // Log detailed error for debugging
        res.status(400).json({ message: error.message, details: error.errors || "No additional error details" });
    }
};


export const updateTrip = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { riverName, startDate, endDate, putIn, takeOut, crewNum, organizerId } = req.body;
    try {
        const trip = await Trip.findByPk(id);
        if (trip) {
            trip.riverName = riverName || trip.riverName;
            trip.startDate = startDate || trip.startDate;
            trip.endDate = endDate || trip.startDate;
            trip.putIn = putIn || trip.putIn;
            trip.takeOut = takeOut || trip.takeOut;
            trip.crewNum = crewNum || trip.crewNum;
            trip.organizerId = organizerId || trip.organizerId;
            await trip.save();
            res.json(trip);
        } else {
            res.status(404).json({ message: "Trip not found" });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTrip = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const trip = await Trip.findByPk(id);
        if (trip) {
            await trip.destroy();
            res.json({ message: "Trip deleted" });
        } else {
            res.status(404).json({ message: "Trip not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
