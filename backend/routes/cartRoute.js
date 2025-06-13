import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'
import verifyToken from '../middleware/verifyToken.js';
const cartRouter = express.Router()
cartRouter.post('/get', verifyToken, getUserCart)
cartRouter.post('/add', verifyToken, addToCart)
cartRouter.post('/update', verifyToken, updateCart)

export default cartRouter