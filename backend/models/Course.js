const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: ['Programming', 'Web Development', 'Digital Marketing', 'UI/UX Design', 'Data Science']
  },
  description: {
    type: String,
    required: [true, 'Course description is required']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor',
    required: [true, 'Course instructor is required']
  },
  duration: {
    type: Number,
    required: [true, 'Course duration is required']
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalStudents: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    default: 'default-course.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);