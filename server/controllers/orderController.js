import ErrorResponse from '../utils/errorResponse.js';
import Order from '../models/order.js';
import Product from '../models/product.js';
import Course from '../models/course.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const { items, shipping, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return next(new ErrorResponse('No order items', 400));
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      if (item.type === 'product') {
        const product = await Product.findById(item.id);
        if (!product) {
          return next(new ErrorResponse(`Product not found with id of ${item.id}`, 404));
        }
        if (product.stock < item.quantity) {
          return next(new ErrorResponse(`Not enough stock for ${product.name}`, 400));
        }
        totalPrice += product.price * item.quantity;
        orderItems.push({
          product: item.id,
          quantity: item.quantity,
          price: product.price
        });
        product.stock -= item.quantity;
        await product.save();
      } else if (item.type === 'course') {
        const course = await Course.findById(item.id);
        if (!course) {
          return next(new ErrorResponse(`Course not found with id of ${item.id}`, 404));
        }
        totalPrice += course.price;
        orderItems.push({
          course: item.id,
          quantity: 1,
          price: course.price
        });
        course.students += 1;
        await course.save();
      }
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shipping,
      paymentMethod,
      totalPrice
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get orders by user
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: 'items.product',
        select: 'name image'
      })
      .populate({
        path: 'items.course',
        select: 'title image'
      });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get orders for seller
// @route   GET /api/orders/seller
// @access  Private (seller)
export const getSellerOrders = async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.user.id }).select('_id');
    const courses = await Course.find({ instructor: req.user.id }).select('_id');

    const productIds = products.map(p => p._id);
    const courseIds = courses.map(c => c._id);

    const orders = await Order.find({
      $or: [
        { 'items.product': { $in: productIds } },
        { 'items.course': { $in: courseIds } }
      ]
    })
    .populate('user', 'name email')
    .populate({
      path: 'items.product',
      select: 'name image'
    })
    .populate({
      path: 'items.course',
      select: 'title image'
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};
