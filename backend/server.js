import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
// import protectedRoutes from './routes/protectedRoutes.js'


const app = express();
const PORT = process.env.PORT || 5000;



dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/auth', authRoutes);
app.use('/jobs',jobRoutes)
// app.use('/auth',protectedRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

