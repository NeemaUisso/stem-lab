import { Router } from 'express';
import { getpracticals, getpracticalsDetails } from '../controllers/contentController.js';
import { get } from 'mongoose';

const router = Router();

// Define routes 
router.get('/get-practicals', getpracticals);
router.get('/get-practicals/:id',getpracticalsDetails);

export default router;
