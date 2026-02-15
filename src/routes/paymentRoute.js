import { paymentOder, verifypayment } from "../controller/paymentController.js";
import express from "express";
const paymentRouter = express.Router();

paymentRouter.post("/rajorpay/createorder", paymentOder);
paymentRouter.post("/rajorpay/verifypayment", verifypayment);

export default paymentRouter;
