import order from "../schema/orderSchema.js";


export const placeOrder = async (req, res) => {
  try {
    const orderDetail = req.body;
    const orderData = await order.create(orderDetail);
    res.status(201).json({
      message: "order created successfully",
      data: orderData,
      success: true,
    });
  } catch (error) {
    console.log("error in order controller", error.message);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
      success: false,
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const cartData = await order.find({}).populate({
      path: "cartItems.productId",
      select:
        "name price image description category subCategory sizes bestSeller",
    });

    if (!cartData) {
      return res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json({
      success: true,
      data: cartData,
    });
  } catch (error) {
    console.log("Error fetching user cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const removeItem = await order.findByIdAndDelete(id);

    if (!removeItem) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      data: removeItem,
      message: "Order remove successfully",
    });
  } catch (error) {
    console.log("Error in remove order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const changeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log("id in backend", id);

    const updatedOrder = await order.findByIdAndUpdate(
      id,
      { deliveryStatus: status },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    
    io.emit("orderStatusUpdated", updatedOrder);

    res.status(200).json({
      success: true,
      data: updatedOrder,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.log("Error in change order status:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
