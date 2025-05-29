import express from 'express';
import { getAllGearItems, createGearItem } from '../../controllers/gearItemController.js';
const router = express.Router();
router.get('/', getAllGearItems);
router.post('/', createGearItem);
export { router as gearItemRouter };