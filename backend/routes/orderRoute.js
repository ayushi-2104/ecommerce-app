import express from 'express';
import {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe
} from '../controllers/orderController.js';

import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// ✅ Admin Routes
orderRouter.get('/list', adminAuth, allOrders);          // Changed to GET for fetching
orderRouter.patch('/status', adminAuth, updateStatus);   // PATCH is semantically better

// ✅ Payment Routes
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// ✅ User Route
orderRouter.get('/userorders', authUser, userOrders);

//verify payement
orderRouter.post('/verifyStripe', authUser, verifyStripe);
export default orderRouter;
