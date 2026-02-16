// server.js
import express from 'express';
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from './routes/orderRoute.js';
import paymentRouter from './routes/paymentRoute.js';

import { PORT } from './config/serverConfig.js';
import connectDB from './config/connectDB.js';

const app = express();

// ✅ Create HTTP server
const server = http.createServer(app);

// ----------------- CORS Setup -----------------
const allowedOrigins = [
  "https://e-commerce-frontend-tawny-eight.vercel.app",   // real frontend URL
  "https://e-commerce-admin-first-by-me.vercel.app",      // real admin URL
  "http://localhost:5174",                                 // local frontend
  "http://localhost:5175"                                  // local admin
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman / server-to-server requests
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("Not allowed by CORS"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ✅ JSON Parsing
app.use(express.json());

// ----------------- Routes -----------------
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);

// ----------------- Socket.IO -----------------
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ----------------- Root Endpoint -----------------
app.get("/", (req, res) => {
  res.json({ data: "start of our e-commerce backend development" });
});

// ----------------- Start Server -----------------
server.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
  await connectDB();
});

// ✅ Export io for controllers
export { io };
