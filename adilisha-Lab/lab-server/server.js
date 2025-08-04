import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';


//database
import connectDB from './configDB/connectDB.js'; 
connectDB();

//import routes
import getpracticalsRoutes from './Routes/practicals.route.js';
import practicalRoutes from './Routes/practicalRoutes.js';
import userRoutes from './Routes/user.Routes.js';




dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));


app.use('/api',getpracticalsRoutes);
app.use('/api/practicals', practicalRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
