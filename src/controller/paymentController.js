import Razorpay from "razorpay";
import crypto from "crypto";
import {
  ROJARPAY_API_KEY,
  ROJARPAY_KEY_SECRET,
} from "../config/serverConfig.js";

export const paymentOder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const razorpayInstance = new Razorpay({
      key_id: ROJARPAY_API_KEY,
      key_secret: ROJARPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      payment_capture: 1,
      notes: {
        userId: "test_user_001",
      },
    };

    // create order in Razorpay
    const response = await razorpayInstance.orders.create(options);

    // send required data to frontend
    return res.status(200).json({
      success: true,

      key: ROJARPAY_API_KEY, // frontend ke liye REQUIRED
      order_id: response.id,
      amount: response.amount,
      currency: response.currency,

      // optional full data
      data: response,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const verifypayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification data",
      });
    }

    // Step 1: Generate expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", ROJARPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // Step 2: Compare signature
    if (expectedSignature === razorpay_signature) {
      // ✅ Payment verified

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",

        paymentId: razorpay_payment_id,

        orderId: razorpay_order_id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.error("Verify payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
