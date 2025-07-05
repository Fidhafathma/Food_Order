const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Food = require('../models/Food');
const Restaurant = require('../models/Restaurant');


const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { deliveryAddress } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('items.food');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    
    const restaurantId = cart.items[0].food.restaurant.toString();

    
    const allSameRestaurant = cart.items.every(
      item => item.food.restaurant.toString() === restaurantId
    );

    if (!allSameRestaurant) {
      return res.status(400).json({ message: 'All items must be from the same restaurant' });
    }

    const orderItems = cart.items.map(item => ({
      food: item.food._id,
      quantity: item.quantity,
      price: item.food.price,
    }));

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const newOrder = new Order({
      user: userId,
      deliveryAddress,
      items: orderItems,
      totalPrice,
      restaurant: restaurantId, 
    });

    await newOrder.save();

    
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.food');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getRestaurantOrders = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant || restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not own this restaurant' });
    }

    const orders = await Order.find({ restaurant: restaurantId })
      .populate('items.food')
      .populate('user', 'name email');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId).populate('restaurant');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not own this restaurant' });
    }

    if (!['preparing', 'delivering', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getRestaurantOrders,
  updateOrderStatus,
};
