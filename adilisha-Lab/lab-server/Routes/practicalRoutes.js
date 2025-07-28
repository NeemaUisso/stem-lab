import express from 'express';
import multer from 'multer';
import { uploadPractical } from '../controllers/practicalController.js';

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  }
});

const upload = multer({ storage });

// Route to handle practical upload
router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'materialImages', maxCount: 10 }
  ]),
  uploadPractical
);

export default router;
