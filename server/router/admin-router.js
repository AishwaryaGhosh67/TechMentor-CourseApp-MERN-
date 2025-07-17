const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const Order = require("../models/order-model");

// ✅ USER ROUTES
router.get("/users", authMiddleware, adminMiddleware, adminController.getAllUsers);
router.get("/users/:id", authMiddleware, adminMiddleware, adminController.getUserById);
router.patch("/users/update/:id", authMiddleware, adminMiddleware, adminController.updateUserById);
router.delete("/users/delete/:id", authMiddleware, adminMiddleware, adminController.deleteUsersById);

// ✅ CONTACT ROUTES
router.get("/contacts", authMiddleware, adminMiddleware, adminController.getAllContacts);
router.delete("/contacts/delete/:id", authMiddleware, adminMiddleware, adminController.deleteContactById);

// ✅ ORDER ROUTE for Admin Dashboard
router.get("/orders", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email phone")        // Get user details
      .populate("service", "service description price"); // Get service details

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("🔴 Admin Orders Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
