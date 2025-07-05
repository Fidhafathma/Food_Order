const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getUserOrders,
  getRestaurantOrders,
  updateOrderStatus,
} = require('../controllers/orderController');

const {protect} = require('../middleware/authMiddleware');
const {ownerOnly} = require('../middleware/ownerMiddleware');

router.post('/', protect, placeOrder);

router.get('/my-orders', protect, getUserOrders);


router.get('/restaurant/:restaurantId', protect, ownerOnly, getRestaurantOrders);


router.put('/status/:orderId', protect, ownerOnly, updateOrderStatus);

module.exports = router;
