const express = require('express');
const {
  createOrder,
  getMyOrders,
  getSellerOrders
} = require('../controllers/orderController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, createOrder);

router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/seller')
  .get(protect, authorize('seller'), getSellerOrders);

module.exports = router;