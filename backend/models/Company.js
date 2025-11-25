const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    default: '1-10'
  },
  location: {
    type: String,
    trim: true
  },
  founded: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear()
  },
  logo: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String,
    trim: true
  },
  socialLinks: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
  },
  benefits: [{
    type: String,
    trim: true
  }],
  culture: {
    type: String,
    trim: true
  },
  mission: {
    type: String,
    trim: true
  },
  values: [{
    type: String,
    trim: true
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('company', CompanySchema);