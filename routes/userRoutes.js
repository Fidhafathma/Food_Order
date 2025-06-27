// routes/userRoutes.js
const express = require('express');

const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  checkUserRole,
  getAllUsers,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

const router = express.Router();

// Register Route
router.post('/signup', registerUser);

// Login Route
router.post('/login', loginUser);


router.get('/profile', protect,getUserProfile);

router.post('/logout', logoutUser);

router.get('/check-role', protect, checkUserRole);

router.get('/all-users', protect, adminOnly, getAllUsers);
module.exports = router;
