import express from 'express';
import { club, projectCompetition } from '../controllers/competition.js';

const router = express.Router();

// Route for creating a club
router.post('/club', club);
router.post('/team', projectCompetition);



export default router;