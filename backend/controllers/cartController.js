import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body;
        const userId = req.userId;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = { [size]: 1 };
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log("Add to Cart Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update cart quantity
const updateCart = async (req, res) => {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId;

    console.log("[BACKEND] updateCart called with", { userId, itemId, size, quantity });

    try {
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        console.log("[BACKEND] Current cartData:", user.cartData);

        let cartData = { ...user.cartData };
        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });
        console.log("[BACKEND] cartData saved:", cartData);

        res.json({ success: true, message: "Cart Updated" });
    } catch (err) {
        console.error("[BACKEND] updateCart error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


// Get cart for user
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.log("Get Cart Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
