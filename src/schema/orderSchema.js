import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "it is mandatory"],
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zipcode: {
      type: Number,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
    deliveryStatus: {
      type: String,
      enum: [
        "Pending",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Refunded",
      ],
      default: "Pending",
    },
    payment: {
      type: Number,
      trim: true,
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
        size: {
          type: String,
          trim: true,
        },
        price: {
          type: Number,
        },
        name: {
          type: String,
          trim: true,
        },
      },
    ],
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true },
);

const order = mongoose.model("Order", orderSchema);
export default order;
