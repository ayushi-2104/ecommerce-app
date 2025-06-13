import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Test route
app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, () => console.log('✅ Server started on PORT: ' + port));
