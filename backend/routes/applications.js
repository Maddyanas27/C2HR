const express = require('express');
const Application = require('../models/Application');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST api/applications
// @desc    Apply for a job
// @access  Private (Candidate only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'candidate') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  const { jobId, coverLetter } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    // Check if already applied
    const existingApplication = await Application.findOne({ job: jobId, candidate: req.user.id });
    if (existingApplication) {
      return res.status(400).json({ msg: 'Already applied for this job' });
    }

    const newApplication = new Application({
      job: jobId,
      candidate: req.user.id,
      coverLetter
    });

    const application = await newApplication.save();

    // Add application to job
    job.applications.push(application.id);
    await job.save();

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/applications/candidate
// @desc    Get applications by candidate
// @access  Private (Candidate only)
router.get('/candidate', auth, async (req, res) => {
  if (req.user.role !== 'candidate') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const applications = await Application.find({ candidate: req.user.id })
      .populate('job', 'title company location')
      .sort({ date: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/applications/job/:jobId
// @desc    Get applications for a job
// @access  Private (Employer or Consultant)
router.get('/job/:jobId', auth, async (req, res) => {
  if (req.user.role !== 'employer' && req.user.role !== 'consultant') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    if (req.user.role === 'employer' && job.employer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('candidate', 'name email profile')
      .populate('job', 'title company')
      .sort({ date: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/applications
// @desc    Get all applications (Admin/Consultant only)
// @access  Private (Consultant only)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'consultant') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  try {
    const applications = await Application.find()
      .populate('candidate', 'name email profile')
      .populate('job', 'title company')
      .sort({ date: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/applications/:id/status
// @desc    Update application status
// @access  Private (Employer or Consultant)
router.put('/:id/status', auth, async (req, res) => {
  if (req.user.role !== 'employer' && req.user.role !== 'consultant') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  const { status } = req.body;

  try {
    let application = await Application.findById(req.params.id).populate('job');
    if (!application) return res.status(404).json({ msg: 'Application not found' });

    if (req.user.role === 'employer' && application.job.employer.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;