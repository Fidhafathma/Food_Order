const express = require('express');
const router = express.Router();

const {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require('../controllers/cartController');

const {protect} = require('../middleware/authMiddleware');


router.post('/add', protect, addToCart);


router.get('/', protect, getUserCart);


router.put('/update/:foodId', protect, updateCartItem);


router.delete('/remove/:foodId', protect, removeCartItem);


router.delete('/clear', protect, clearCart);

module.exports = router;
