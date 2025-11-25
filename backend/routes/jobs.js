const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name company').sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name company');
    if (!job) return res.status(404).json({ msg: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/jobs
// @desc    Create a job
// @access  Private (Employer and Consultant only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'employer' && req.user.role !== 'consultant') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  // Check if employer is approved
  if (req.user.role === 'employer' && !req.user.isApproved) {
    return res.status(403).json({ msg: 'Your account is pending approval to post jobs' });
  }

  const { title, company, location, description, requirements, salary, type } = req.body;

  try {
    const newJob = new Job({
      title,
      company,
      location,
      description,
      requirements,
      salary,
      type,
      employer: req.user.id
    });

    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/jobs/:id
// @desc    Update a job
// @access  Private (Employer only)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/jobs/:id
// @desc    Delete a job
// @access  Private (Employer only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    let job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    await Job.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/jobs/employer/:id
// @desc    Get jobs by employer
// @access  Private (Employer or Consultant)
router.get('/employer/:id', auth, async (req, res) => {
  if (req.user.role !== 'employer' && req.user.role !== 'consultant') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const jobs = await Job.find({ employer: req.params.id }).sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;