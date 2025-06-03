"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCrew = exports.createCrew = exports.getAllCrew = void 0;
const crew_js_1 = require("../models/crew.js");
const user_js_1 = require("../models/user.js");
const getAllCrew = async (req, res) => {
    const { tripId } = req.params;
    console.log(tripId);
    try {
        const crewMembers = await crew_js_1.Crew.findAll({
            where: {
                tripId: tripId
            },
            include: [
                {
                    model: user_js_1.User,
                    as: "user",
                    attributes: ["id", "username", "firstName", "lastName", "email"]
                }
            ]
        });
        res.json(crewMembers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllCrew = getAllCrew;
const createCrew = async (req, res) => {
    try {
        const { tripId, userId } = req.body;
        const crew = await crew_js_1.Crew.create({ tripId, userId });
        res.status(201).json(crew);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.createCrew = createCrew;
const deleteCrew = async (req, res) => {
    const { crewId } = req.params;
    console.log(crewId);
    try {
        const crewMember = await crew_js_1.Crew.findByPk(crewId);
        console.log(crewMember);
        if (crewMember) {
            await crewMember.destroy();
            res.json({ message: 'Ticket deleted' });
        }
        else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteCrew = deleteCrew;
//# sourceMappingURL=crewControllers.js.map