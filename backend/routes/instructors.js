const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');
const Course = require('../models/Course');

// Get all instructors
router.get('/', async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get instructor by ID
router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id)
      .populate('courses');
    
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    
    res.json(instructor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new instructor
router.post('/', async (req, res) => {
  try {
    const instructor = new Instructor(req.body);
    await instructor.save();
    res.status(201).json(instructor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update instructor
router.put('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    
    res.json(instructor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete instructor
router.delete('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }
    
    // Update or delete related courses
    await Course.updateMany(
      { instructor: req.params.id },
      { $unset: { instructor: 1 } }
    );
    
    res.json({ message: 'Instructor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get courses by instructor
router.get('/:id/courses', async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.params.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;