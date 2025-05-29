import { Request, Response } from 'express';
import { Crew } from '../models/crew.js';
import {User} from "../models/user.js"

const getAllCrew = async (req: Request, res: Response) => {
    const { tripId } = req.params
    console.log(tripId)
    try {
        const crewMembers = await Crew.findAll({
            where: {
                tripId: tripId
            },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id","username", "firstName", "lastName", "email"]

                }
            ]
        });
        res.json(crewMembers);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

const createCrew = async (req: Request, res: Response) => {
    try {
        const { tripId , userId } = req.body
        const crew = await Crew.create({tripId , userId});
        res.status(201).json(crew);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

const deleteCrew = async (req:Request, res:Response) => {
    const { crewId } = req.params;
    console.log(crewId)
    try {
        const crewMember = await Crew.findByPk(crewId);
        console.log(crewMember)
        if (crewMember) {
            await crewMember.destroy();
            res.json({ message: 'Ticket deleted' });
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}


export { getAllCrew, createCrew, deleteCrew}