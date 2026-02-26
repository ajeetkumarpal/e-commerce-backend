import mongoose from "mongoose";
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




    
//   export const changeOrderStatus = async (req, res) => {
//     console.log("hhh")
//   try {
    
//     const { statusIs,id } = req.body;

//     console.log("id in backender:", id);
//     console.log("status in backend:", statusIs);

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid order ID",
//       });
//     }

//     const updatedOrder = await order.findByIdAndUpdate(
//       id,
//       { deliveryStatus: statusIs },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     console.log("Updated order:", updatedOrder);

//     res.status(200).json({
//       success: true,
//       data: updatedOrder,
//       message: "Order status updated successfully",
//     });
//   } catch (error) {
//     console.error("Error in change order status:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// }; 


export const changeOrderStatus = async (req, res) => {
  console.log("=== CHANGE ORDER STATUS HIT ===");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.originalUrl);
  console.log("Request base URL:", req.baseUrl);
  console.log("Request path:", req.path);
  console.log("Full request body:", req.body);
  console.log("Request headers:", req.headers);
  
  try {
    const { statusIs, id } = req.body;

    console.log("Extracted - id in backender:", id);
    console.log("Extracted - status in backend:", statusIs);
    console.log("ID type:", typeof id);
    console.log("ID length:", id?.length);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID format");
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const updatedOrder = await order.findByIdAndUpdate(
      id,
      { deliveryStatus: statusIs },
      { new: true }
    );

    if (!updatedOrder) {
      console.log("Order not found with ID:", id);
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log("Updated order:", updatedOrder);
    res.status(200).json({
      success: true,
      data: updatedOrder,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error("Error in change order status:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};