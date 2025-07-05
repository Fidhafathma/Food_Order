const Restaurant = require ( '../models/Restaurant' );

//show restaurants in home page
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}, 'name image location rating');
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//when clicked on restaurant ftom home page
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('menu');
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//search restaurant from search bar
const searchRestaurantsByName = async (req, res) => {
  try {
    const { name } = req.query;  // get search term from query string

    // Find restaurants whose name contains the search text (case-insensitive)
    const restaurants = await Restaurant.find({
      name: { $regex: name, $options: 'i' }
    }).populate('menu');  

    if (restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found' });
    }

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create res by owner 
const createRestaurant = async (req, res) => {
  try {
    const { name, image, location, rating } = req.body;
    const owner = req.user._id;

    const newRestaurant = new Restaurant({
      name,
      image,
      location,
      rating,
      owner,
      menu: [],
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update by owner
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const { name, image, location, rating } = req.body;

    if (name) restaurant.name = name;
    if (image) restaurant.image = image;
    if (location) restaurant.location = location;
    if (rating) restaurant.rating = rating;

    const updated = await restaurant.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete by admin
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    await restaurant.deleteOne();
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurantsByName,
};