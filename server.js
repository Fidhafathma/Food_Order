const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

console.log('Mongo URI:', process.env.MONGO_URI);

connectDB();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running successfully');
});

const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
