import express from 'express';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/DBConnection.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
