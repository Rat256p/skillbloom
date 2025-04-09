import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  getInstructorCourses
} from '../controllers/courseController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, authorize('seller'), createCourse);

router.route('/instructor')
  .get(protect, authorize('seller'), getInstructorCourses);

router.route('/:id')
  .get(getCourse);

export default router;
