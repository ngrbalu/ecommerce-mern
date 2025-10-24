import dotenv from "dotenv";
dotenv.config(); 
import Stripe from "stripe";
import Order from "../models/Order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc Create payment intent (mock payment)
// @route POST /api/payment/create
export const createPaymentIntent = async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Create a payment intent (Stripe test mode)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // Stripe expects cents
      currency: "usd",
      description: `Order #${order._id}`,
      metadata: { order_id: order._id.toString(), user_id: order.user.toString() },
    });

    // Return client secret to frontend
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: "Stripe Payment Failed", error: error.message });
  }
};

// @desc Confirm payment (mock success callback)
// @route POST /api/payment/success
export const confirmPayment = async (req, res) => {
  const { orderId, paymentId } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: paymentId || "mock_payment_id",
      status: "succeeded",
    };

    const updatedOrder = await order.save();
    res.status(200).json({ message: "Payment confirmed", order: updatedOrder });
  } catch (error) {
    console.error("Confirm Error:", error);
    res.status(500).json({ message: "Payment confirmation failed", error: error.message });
  }
};
