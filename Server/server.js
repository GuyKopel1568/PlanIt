// Loads environment variables from a .env file into process.env.
require('dotenv').config();
//A web framework for Node.js to easily build APIs and handle HTTP requests.
const express = require('express');
//ODM (Object Data Modeling) library for MongoDB
const mongoose = require('mongoose');

const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

// Initializes your Express app
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api', userRoutes);

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Connect to MongoDB
connectMongoDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
