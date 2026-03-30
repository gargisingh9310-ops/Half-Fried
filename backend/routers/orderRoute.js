import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder, verifyOrder } from '../controllers/orderController.js'

const orderRouter= express.Router();

orderRouter.post("/place", placeOrder, authMiddleware);
orderRouter.post("/verify", verifyOrder)


export default orderRouter;