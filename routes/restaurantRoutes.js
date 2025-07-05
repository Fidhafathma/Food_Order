const express = require('express');
const router = express.Router();

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurantsByName,
} = require('../controllers/restaurantController');

const {protect} = require('../middleware/authMiddleware');
const {adminOnly} = require('../middleware/adminMiddleware');
const {ownerOnly} = require('../middleware/ownerMiddleware');
const {verifyOwner} = require('../middleware/verifyownerMiddleware');

router.get('/', getAllRestaurants);

router.get('/:id', getRestaurantById);

router.post('/', protect, ownerOnly, createRestaurant);

router.put('/:id', protect, ownerOnly, verifyOwner, updateRestaurant);

router.delete('/:id', protect, adminOnly, deleteRestaurant);

module.exports = router;