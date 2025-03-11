const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Instructor name is required'],
    trim: true
  },
  expertise: {
    type: String,
    required: [true, 'Expertise is required']
  },
  bio: {
    type: String,
    required: [true, 'Bio is required']
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
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  imageUrl: {
    type: String,
    default: 'default-instructor.jpg'
  },
  socialLinks: {
    website: String,
    linkedin: String,
    twitter: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Instructor', instructorSchema);