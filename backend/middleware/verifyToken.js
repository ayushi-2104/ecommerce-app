// middleware/verifyToken.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    console.log("[BACKEND] verifyToken: token =", token?.slice(0, 10) + "...");

    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("[BACKEND] Token decoded. userId =", decoded.id);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.log("[BACKEND] Token invalid:", err.message);
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
};


export default verifyToken;
