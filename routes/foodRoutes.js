const express = require('express');
const router = express.Router();

const {
  addFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require('../controllers/foodController');


const {protect} = require('../middleware/authMiddleware');
const {adminOnly} = require('../middleware/adminMiddleware');
const {ownerOnly} = require('../middleware/ownerMiddleware');
const {verifyOwner} = require('../middleware/verifyownerMiddleware');

router.get('/', getAllFoods);
router.get('/:id', getFoodById);

router.post('/', protect, ownerOnly, verifyOwner, addFood);

router.put('/:id', protect, ownerOnly, updateFood);

router.delete('/:id', protect, deleteFood);

module.exports = router;
