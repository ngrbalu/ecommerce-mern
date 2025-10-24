import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    shippingAddress: { type: String },
    paymentMethod: { type: String },
    paymentResult: { id: String, status: String },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
