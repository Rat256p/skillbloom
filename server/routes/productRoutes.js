const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  getSellerProducts
} = require('../controllers/productController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getProducts)
  .post(protect, authorize('seller'), createProduct);

router.route('/seller')
  .get(protect, authorize('seller'), getSellerProducts);

router.route('/:id')
  .get(getProduct);

module.exports = router;