const Food = require('../models/Food');
const Restaurant = require('../models/Restaurant');

const addFood = async (req, res) => {
  try {
    const { name, image, description, price, restaurantId } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not own this restaurant' });
    }

    const food = new Food({ name, image, description, price, restaurant: restaurantId });

    const savedFood = await food.save();

    restaurant.menu.push(savedFood._id);
    await restaurant.save();

    res.status(201).json(savedFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate('restaurant', 'name location');
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant', 'name location');
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant');
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    if (food.restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not own this restaurant' });
    }

    const { name, image, description, price } = req.body;

    if (name) food.name = name;
    if (image) food.image = image;
    if (description) food.description = description;
    if (price) food.price = price;

    const updated = await food.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant');

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const isOwner = req.user.role === 'owner' && food.restaurant.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this food item' });
    }

    const restaurant = await Restaurant.findById(food.restaurant._id);
    restaurant.menu.pull(food._id);
    await restaurant.save();

    await food.deleteOne();
    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
};