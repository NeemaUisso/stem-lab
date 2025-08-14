import express from 'express';
import { club, projectCompetition ,getMyClub} from '../controllers/competition.js';
import { verifyToken } from '../middlewares/auth.js';
import multer from 'multer';

const router = express.Router();






const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Route for creating a club
router.post('/club',verifyToken, club);
router.get('/my-club', verifyToken,getMyClub)
router.post('/team',upload.single('document'), verifyToken, projectCompetition);





export default router;