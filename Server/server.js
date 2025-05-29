require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();

// ✅ CORS middleware (only once)
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow only frontend
    credentials: true,
  })
);

// ✅ JSON body parser middleware (only once)
app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ User route setup
app.use('/api', userRoutes);

// ✅ Connect to MongoDB
async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectMongoDB();

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
