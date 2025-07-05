const Restaurant = require('../models/Restaurant');

const verifyOwner = async (req, res, next) => {
  try {
    const restaurantId = req.params.id || req.body.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You do not own this restaurant.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error during owner verification.' });
  }
};

module.exports = { verifyOwner };
