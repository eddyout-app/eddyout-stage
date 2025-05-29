import express from 'express';
import { getGearLists, createGearList } from '../../controllers/gearListController.js';
const router = express.Router();
router.get('/', getGearLists);
router.post('/', createGearList);
export { router as gearListRouter };