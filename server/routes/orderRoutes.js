import express from 'express';
import {
  createOrder,
  getMyOrders,
  getSellerOrders
} from '../controllers/orderController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder);

router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/seller')
  .get(protect, authorize('seller'), getSellerOrders);

export default router;
