// server/router/payment-router.js
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const authMiddleware = require("../middlewares/auth-middleware");
const Order = require("../models/order-model");
require("dotenv").config();

const router = express.Router();

// ✅ Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// ✅ Create Razorpay Order
router.post("/order", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("✅ Razorpay order created:", order.id);

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("🔴 Razorpay Order Error:", err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
});

// ✅ Verify Razorpay Payment and Store Order
router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      serviceId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !serviceId ||
      !amount
    ) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // ✅ Save to DB using ObjectId references
      const newOrder = new Order({
        user: req.userId,        // from authMiddleware
        service: serviceId,      // from frontend
        amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: "success",
      });

      await newOrder.save();
      console.log("✅ Order saved to DB");

      return res.status(200).json({ success: true, message: "Payment verified and order saved" });
    } else {
      console.warn("⚠️ Invalid signature - Payment Failed");
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("🔴 Verification error:", error);
    return res.status(500).json({ success: false, message: "Verification failed" });
  }
});

module.exports = router;
