import express from "express";
import {
  placeOrder,
  getUserCart,
  removeOrder,
  changeOrderStatus,
} from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.get("/list", getUserCart);
orderRouter.delete("/:id", removeOrder);
orderRouter.put("/update", changeOrderStatus);

export default orderRouter;
