const Order = require("../models/ordermodels");

const createOrder = async (req, res) => {
  try {
    const { userId, items, deliveryDetails, paymentMethod, totalPrice } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    const newOrder = new Order({
      userId,  
      items,
      deliveryDetails,
      paymentMethod,
      totalPrice,
    });

    await newOrder.save();

    res.json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
  console.error("Error placing order", error);
  res.status(500).json({ success: false, message: "Error placing order" });
}
};

// Get orders for a specific user
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders", error);
    res.status(500).json({ success: false, message: "Error fetching user orders" });
  }
};

// ✅ Get all orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).json({ success: false, message: "Error fetching all orders" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order", error);
    res.status(500).json({ success: false, message: "Error cancelling order" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, status: updated.status });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating status" });
  }
}

module.exports = {createOrder, getOrders, getAllOrders, cancelOrder, updateStatus}