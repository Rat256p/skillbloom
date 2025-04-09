import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  getSellerProducts
} from '../controllers/productController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorize('seller'), createProduct);

router.route('/seller')
  .get(protect, authorize('seller'), getSellerProducts);

router.route('/:id')
  .get(getProduct);

export default router;
