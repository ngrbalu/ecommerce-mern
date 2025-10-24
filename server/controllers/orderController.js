import Order from "../models/Order.js";

// @desc Create new order
// @route POST /api/orders
export const addOrderItems = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  });

  const created = await order.save();
  res.status(201).json(created);
};

// @desc Get logged-in user’s orders
// @route GET /api/orders/myorders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("orderItems.product", "name price");
  res.json(orders);
};

// @desc Get order by ID
// @route GET /api/orders/:id
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (order) res.json(order);
  else res.status(404).json({ message: "Order not found" });
};
