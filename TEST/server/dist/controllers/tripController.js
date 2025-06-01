"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrip = exports.updateTrip = exports.createTrip = exports.getTripById = exports.getAllTrips = void 0;
const trip_js_1 = require("../models/trip.js");
const getAllTrips = async (_req, res) => {
    try {
        const trips = await trip_js_1.Trip.findAll();
        res.json(trips);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllTrips = getAllTrips;
const getTripById = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await trip_js_1.Trip.findByPk(id);
        if (trip) {
            res.json(trip);
        }
        else {
            res.status(404).json({ message: "Trip not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getTripById = getTripById;
const createTrip = async (req, res) => {
    const { riverName, startDate, endDate, putIn, takeOut, crewNum, organizerId } = req.body;
    if (!riverName || !startDate || !endDate || !putIn || !takeOut || !crewNum) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    try {
        const newTrip = await trip_js_1.Trip.create({
            riverName,
            startDate,
            endDate,
            putIn,
            takeOut,
            crewNum,
            organizerId,
        });
        res.status(201).json(newTrip);
    }
    catch (error) {
        console.error(error); // Log detailed error for debugging
        res.status(400).json({ message: error.message, details: error.errors || "No additional error details" });
    }
};
exports.createTrip = createTrip;
const updateTrip = async (req, res) => {
    const { id } = req.params;
    const { riverName, startDate, endDate, putIn, takeOut, crewNum, organizerId } = req.body;
    try {
        const trip = await trip_js_1.Trip.findByPk(id);
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
        }
        else {
            res.status(404).json({ message: "Trip not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateTrip = updateTrip;
const deleteTrip = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await trip_js_1.Trip.findByPk(id);
        if (trip) {
            await trip.destroy();
            res.json({ message: "Trip deleted" });
        }
        else {
            res.status(404).json({ message: "Trip not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteTrip = deleteTrip;
