const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'job',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure a user can only bookmark a job once
BookmarkSchema.index({ user: 1, job: 1 }, { unique: true });

module.exports = mongoose.model('bookmark', BookmarkSchema);