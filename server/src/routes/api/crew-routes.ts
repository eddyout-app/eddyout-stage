import express from 'express';


import { getAllCrew, createCrew, deleteCrew } from '../../controllers/crewControllers.js';

const router = express.Router();
router.get('/:tripId', getAllCrew);
router.post('/create', createCrew);
router.delete('/:crewId', deleteCrew)
export { router as crewRouter };
