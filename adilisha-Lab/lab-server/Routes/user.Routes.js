import express from 'express';
import { registerUser } from '../controllers/user.Controllers.js';   
import { loginUser } from '../controllers/user.Controllers.js'; 
import { verifyToken } from '../middlewares/auth.js';


const router = express.Router();

router.post('/registerUser', registerUser); 
router.post('/login', loginUser);




export default router;