import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe'


//global variables
const currency = 'inr'
const deliveryCharge = 10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;

        if (!items || !amount || !address) {
            return res.status(400).json({ success: false, message: 'Missing order data' });
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = await orderModel.create(orderData);
        res.status(201).json({ success: true, message: 'Order placed', data: newOrder });
    } catch (error) {
        console.error("Order Placement Error:", error.message);
        res.status(500).json({ success: false, message: 'Failed to place order' });
    }
};

//placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, amount, address } = req.body;
        const { origin } = req.headers;

        if (!items || !amount || !address) {
            return res.status(400).json({ success: false, message: 'Missing order data' });
        }

        // Create order in DB (unpaid, will be updated on payment success)
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };
        const newOrder = await orderModel.create(orderData);

        // Prepare Stripe line items
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100 // Stripe expects amount in paise
            },
            quantity: item.quantity
        }));
        line_items.push({
            price_data: {
                currency: currency,
                product_data: { name: 'Delivery Charges' },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            metadata: { orderId: newOrder._id.toString() }
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Stripe Order Placement Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

//verify stripe 
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {

};

//All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.error("User Orders Error:", error.message);
        res.status(500).json({ success: false, message: 'Failed to get user orders' });
    }
}
//All Orders data for Admin Panel
const userOrders = async (req, res) => {
    try {
        const userId = req.userId; // ✅ not from req.body
        const orders = await orderModel.find({ userId });

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("User Orders Error:", error.message);
        res.status(500).json({ success: false, message: 'Failed to get user orders' });
    }
};

//update order status from Admin
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export { verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }
