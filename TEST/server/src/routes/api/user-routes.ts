import express from 'express';
import { getUsers, createUser, getUser } from '../../controllers/userController.js';
const router = express.Router();
router.get('/', getUsers);
router.get('/:id', getUser)
router.post('/', createUser);
export { router as userRouter };