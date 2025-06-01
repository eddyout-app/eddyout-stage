import { Request, Response } from 'express';
import { User } from '../models/user.js';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getUser = async (req:Request,res:Response) => {
    const {id} = req.params
    console.log(id)
    try {
        const user = await User.findByPk(id)
        res.json(user)
    } catch (err:any) {
        res.status(500).json({message: err.message})
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};