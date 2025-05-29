"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateScheduleById = exports.createSchedule = exports.getSchedules = void 0;
const schedule_js_1 = require("../models/schedule.js");
const getSchedules = async (_req, res) => {
    try {
        const schedules = await schedule_js_1.Schedule.findAll();
        res.json(schedules);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getSchedules = getSchedules;
const createSchedule = async (req, res) => {
    try {
        const schedule = await schedule_js_1.Schedule.create(req.body);
        res.status(201).json(schedule);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createSchedule = createSchedule;
const updateScheduleById = async (req, res) => {
    const { id } = req.params;
    const { campsite } = req.body;
    try {
        const schedule = await schedule_js_1.Schedule.findByPk(id);
        if (!schedule) {
            res.status(404).json({ error: "Schedule item not found" });
            return; //
        }
        schedule.campsite = campsite;
        await schedule.save();
        res.json(schedule);
        return;
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update schedule item" });
        return;
    }
};
exports.updateScheduleById = updateScheduleById;
