import orderModel from "../schema/orderSchema.js";
import userModel from "../schema/userSchema.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ==========================
// PLACE ORDER (ONLINE PAYMENT)
// ==========================
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {

        // ✅ Duplicate order protection
        const existingOrder = await orderModel.findOne({
            userId: req.body.userId,
            amount: req.body.amount,
            createdAt: { $gte: new Date(Date.now() - 5000) }
        });

        if (existingOrder) {
            return res.json({
                success: false,
                message: "Duplicate order detected"
            });
        }

        // ✅ CREATE ORDER
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false,
            paymentMethod: "online",
            status: "Food Processing"
        });

        await newOrder.save();

        // ✅ CLEAR CART
        await userModel.findByIdAndUpdate(
            req.body.userId,
            {
                cartData: {}
            }
        );

        // ✅ STRIPE ITEMS
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        // ✅ DELIVERY CHARGE
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 50 * 100
            },
            quantity: 1
        });

        // ✅ STRIPE SESSION
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",

            success_url:
                `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,

            cancel_url:
                `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({
            success: true,
            session_url: session.url
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};

// ==========================
// VERIFY ONLINE PAYMENT
// ==========================
const verifyOrder = async (req, res) => {

    const { orderId, success } = req.body;

    try {

        if (success === "true") {

            await orderModel.findByIdAndUpdate(
                orderId,
                {
                    payment: true
                }
            );

            res.json({
                success: true,
                message: "Paid"
            });

        } else {

            // ❌ DELETE FAILED ORDER
            await orderModel.findByIdAndDelete(orderId);

            res.json({
                success: false,
                message: "Payment Failed"
            });
        }

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};

// ==========================
// USER ORDERS
// ==========================
const userOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({
            userId: req.body.userId
        });

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};

// ==========================
// PLACE ORDER COD
// ==========================
const placeOrderCOD = async (req, res) => {

    try {

        const {
            address,
            items,
            amount,
            paymentMethod
        } = req.body;

        // ✅ COD LIMIT
        if (
            amount > 1000 &&
            paymentMethod?.toLowerCase() === "cod"
        ) {

            return res.json({
                success: false,
                message: "COD not allowed above ₹1000"
            });
        }

        // ✅ DUPLICATE ORDER PROTECTION
        const existingOrder = await orderModel.findOne({
            userId: req.body.userId,
            amount,
            createdAt: {
                $gte: new Date(Date.now() - 5000)
            }
        });

        if (existingOrder) {

            return res.json({
                success: false,
                message: "Duplicate order detected"
            });
        }

        // ✅ CREATE COD ORDER
        const newOrder = new orderModel({
            userId: req.body.userId,
            items,
            amount,
            address,
            status: "Order Placed",
            payment: false,

            // ✅ BOTH COD + ONLINE SUPPORT
            paymentMethod:
                paymentMethod?.toLowerCase() || "cod"
        });

        await newOrder.save();

        // ✅ CLEAR CART
        await userModel.findByIdAndUpdate(
            req.body.userId,
            {
                cartData: {}
            }
        );

        res.json({
            success: true,
            message: "Order placed successfully (COD)"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error placing COD order"
        });
    }
};

// ==========================
// ADMIN - ALL ORDERS
// ==========================
const listOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({});

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};

// ==========================
// UPDATE ORDER STATUS
// ==========================
const updateStatus = async (req, res) => {

    try {

        // ✅ FIND ORDER
        const order = await orderModel.findById(
            req.body.orderId
        );

        // ✅ LOCK DELIVERED ORDER
        if (order.status === "Delivered") {

            return res.json({
                success: false,
                message:
                    "Delivered order cannot be changed"
            });
        }

        // ✅ UPDATE STATUS
        await orderModel.findByIdAndUpdate(
            req.body.orderId,
            {
                status: req.body.status
            }
        );

        res.json({
            success: true,
            message: "Status Updated"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};

export {
    placeOrder,
    verifyOrder,
    userOrders,
    placeOrderCOD,
    listOrders,
    updateStatus
};