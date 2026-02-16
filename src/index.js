import express from 'express';
import cors from "cors";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from './routes/orderRoute.js';
import paymentRouter from './routes/paymentRoute.js';

import { PORT } from './config/serverConfig.js';
import connectDB from './config/connectDB.js';

const app = express();

const allowedOrigins = [
  "https://e-commerce-frontend-tawny-eight.vercel.app",
  "https://e-commerce-admin-my.vercel.app",
  "http://localhost:5174",
  "http://localhost:5175"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // origin allowed
    } else {
      callback(new Error('Not allowed by CORS')); // origin not allowed
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.json({ data: "start of our e-commerce backend development" });
});

app.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
  await connectDB();
});
