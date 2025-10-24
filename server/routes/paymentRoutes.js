import express from "express";
import { createPaymentIntent, confirmPayment } from "../controllers/paymentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createPaymentIntent);
router.post("/success", protect, confirmPayment);

export default router;
