import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
    listOrders,
  placeOrder,
placeOrderCOD,
  updateStatus,
  userOrders,
  verifyOrder
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// ✅ ALWAYS authMiddleware first
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/placecod", authMiddleware, placeOrderCOD);
orderRouter.post("/verify", authMiddleware, verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get('/list', listOrders, authMiddleware)
orderRouter.post('/status', updateStatus, authMiddleware)

export default orderRouter;