const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  getInstructorCourses
} = require('../controllers/courseController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getCourses)
  .post(protect, authorize('seller'), createCourse);

router.route('/instructor')
  .get(protect, authorize('seller'), getInstructorCourses);

router.route('/:id')
  .get(getCourse);

module.exports = router;