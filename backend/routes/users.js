const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  const { company, location, bio, skills, experience, resume, mobile, country, state, pincode } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.profile = { company, location, bio, skills, experience, resume, mobile, country, state, pincode };
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/candidates
// @desc    Get all candidates
// @access  Private (Consultant only)
router.get('/candidates', auth, async (req, res) => {
  if (req.user.role !== 'consultant') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const candidates = await User.find({ role: 'candidate' }).select('-password');
    res.json(candidates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/employers
// @desc    Get all employers
// @access  Private (Consultant only)
router.get('/employers', auth, async (req, res) => {
  if (req.user.role !== 'consultant') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const employers = await User.find({ role: 'employer' }).select('-password');
    res.json(employers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/users/approve/:id
// @desc    Approve an employer to post jobs
// @access  Private (Consultant only)
router.put('/approve/:id', auth, async (req, res) => {
  if (req.user.role !== 'consultant') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    if (user.role !== 'employer') return res.status(400).json({ msg: 'User is not an employer' });

    user.isApproved = true;
    await user.save();

    res.json({ msg: 'Employer approved successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users
// @desc    Get all users
// @access  Private (Consultant only)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'consultant') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;