const express = require('express');
const User = require('../models/user');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get user profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Return profile data with default values
    const profileData = {
      fullName: user.fullName || '',
      email: user.email,
      phone: user.phone || '',
      location: user.location || '',
      degree: user.degree || '',
      college: user.college || '',
      graduationYear: user.graduationYear || '',
      specialization: user.specialization || '',
      skills: user.skills || [],
      experience: user.experience || [],
      projects: user.projects || [],
      resumeFileName: user.resumeFileName || ''
    };
    
    res.json({
      status: 'success',
      data: profileData
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/update', protect, async (req, res) => {
  try {
    const allowedUpdates = [
      'fullName', 'phone', 'location', 'degree', 'college', 
      'graduationYear', 'specialization', 'skills', 'experience', 'projects'
    ];
    
    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({
      status: 'success',
      data: user
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Upload resume
router.post('/upload-resume', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { resumeFileName: req.file.filename },
      { new: true }
    ).select('-password');
    
    res.json({
      status: 'success',
      message: 'Resume uploaded successfully',
      fileName: req.file.filename
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload resume' });
  }
});

module.exports = router;
