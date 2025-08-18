import express from 'express'
import { getClubs,getClubById,getRegions } from '../controllers/club.Controllers.js';



const router = express.Router();



router.get('/club-list', getRegions);
router.get('/get-clubs', getClubs);
router.get('/:id', getClubById);

export default router;