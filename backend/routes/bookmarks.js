const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Bookmark = require('../models/Bookmark');
const Job = require('../models/Job');

// @route   POST api/bookmarks
// @desc    Bookmark a job
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { jobId } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Check if already bookmarked
    const existingBookmark = await Bookmark.findOne({
      user: req.user.id,
      job: jobId
    });

    if (existingBookmark) {
      return res.status(400).json({ msg: 'Job already bookmarked' });
    }

    const bookmark = new Bookmark({
      user: req.user.id,
      job: jobId
    });

    await bookmark.save();
    res.json(bookmark);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/bookmarks/:jobId
// @desc    Remove bookmark from a job
// @access  Private
router.delete('/:jobId', auth, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user.id,
      job: req.params.jobId
    });

    if (!bookmark) {
      return res.status(404).json({ msg: 'Bookmark not found' });
    }

    res.json({ msg: 'Bookmark removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/bookmarks
// @desc    Get user's bookmarked jobs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id })
      .populate({
        path: 'job',
        populate: {
          path: 'employer',
          select: 'name profile.company'
        }
      })
      .sort({ date: -1 });

    res.json(bookmarks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/bookmarks/check/:jobId
// @desc    Check if job is bookmarked by user
// @access  Private
router.get('/check/:jobId', auth, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOne({
      user: req.user.id,
      job: req.params.jobId
    });

    res.json({ isBookmarked: !!bookmark });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;