const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['candidate', 'employer', 'consultant'],
    required: true
  },
  isApproved: {
    type: Boolean,
    default: function() {
      return this.role !== 'employer'; // Candidates and consultants are auto-approved
    }
  },
  profile: {
    company: String,
    location: String,
    bio: String,
    skills: [String],
    experience: String,
    resume: String,
    mobile: String,
    country: String,
    state: String,
    pincode: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);