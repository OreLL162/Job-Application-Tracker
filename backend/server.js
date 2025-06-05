import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import './utils/jobReminders.js';
import { authenticateToken } from './middleware/authMiddleware.js';
import { protectedRouteHandler } from './controllers/protectedController.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser()); // Add cookie-parser middleware

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Public routes
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);

// Protected route
app.get('/protected', authenticateToken, protectedRouteHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

