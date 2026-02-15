import express from 'express';
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import { PORT } from './config/serverConfig.js';
import connectDB from './config/connectDB.js';
import orderRouter from './routes/orderRoute.js';
import paymentRouter from './routes/paymentRoute.js';

const app = express();

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Attach socket.io
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5174", "http://localhost:5175"],
    credentials: true
  }
});

// ✅ Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


// ----------------- CORS -----------------
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5175"
];

app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("Not allowed by CORS"), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// ----------------- Routes -----------------
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.json({ data: "start of our e-commerce backend development" })
});

// ✅ IMPORTANT: use server.listen not app.listen
server.listen(PORT, async () => {
  console.log(`Server started on ${PORT}`);
  await connectDB();
});

// ✅ Export io for controllers
export { io };



// import express from 'express';
// import cors from "cors";

// import userRouter from "./routes/userRoute.js";
// import productRouter from "./routes/productRoute.js";
// import { PORT } from './config/serverConfig.js';
// import connectDB from './config/connectDB.js';
// import orderRouter from './routes/orderRoute.js';
// import paymentRouter from './routes/paymentRoute.js';



// const app=express();
 


// // app.use(cors({
// //      origin: "http://localhost:5174" || "http://localhost:5174", // frontend ka exact URL
// //   credentials: true, // cookies allow karne ke liye
// // }));
// const allowedOrigins = [
//   "http://localhost:5174", // Admin frontend
//   "http://localhost:5175"  // User frontend
// ];

// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin like Postman
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true
// }));

// app.use(express.json());


// app.use("/api/user",userRouter);
// app.use("/api/product",productRouter);
// app.use("/api/order",orderRouter);
// app.use("/api/payment",paymentRouter);


// app.get("/",(req,res)=>{
//     res.json({data:"start of our e-commerce backend development"})
// })

// app.listen(PORT,async ()=>{
//     console.log("server is started on 3000");
//      await connectDB();
// })