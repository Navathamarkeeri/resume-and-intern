const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  // Profile fields
  fullName: { 
    type: String, 
    trim: true 
  },
  phone: { 
    type: String, 
    trim: true 
  },
  location: { 
    type: String, 
    trim: true 
  },
  degree: { 
    type: String, 
    trim: true 
  },
  college: { 
    type: String, 
    trim: true 
  },
  graduationYear: { 
    type: String, 
    trim: true 
  },
  specialization: { 
    type: String, 
    trim: true 
  },
  skills: [{ 
    type: String, 
    trim: true 
  }],
  experience: [{
    company: String,
    position: String,
    duration: String,
    description: String
  }],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    link: String
  }],
  resumeFileName: { 
    type: String 
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);