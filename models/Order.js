const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deliveryAddress: {
    BuildingName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],

  totalPrice: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'preparing', 'delivering', 'completed', 'cancelled'],
    default: 'pending'
  },

  orderedAt: {
    type: Date,
    default: Date.now
  },

  deliveryTime: {
    type: Date
  }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
