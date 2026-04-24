// backend/routes/profile.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../config/db');
const profileController = require('../controllers/profileController');
const requireAuth = require('../middleware/requireAuth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
});

// Routes
router.get('/', requireAuth, profileController.getProfile);

router.post('/update', requireAuth, upload.fields([
  { name: 'student_id_url', maxCount: 1 },
  { name: 'employment_doc_url', maxCount: 1 }
]), profileController.updateProfile);
module.exports = router;