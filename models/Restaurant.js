const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
  image: { type: String },          
  rating: { type: Number, default: 0 },
  location: { type: String },
  menu:[{type:mongoose.Schema.Types.ObjectId,ref:'Food'}]
},{ timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);