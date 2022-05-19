import express from "express";
import mongoose from "mongoose";
import { userRouter, orderRouter } from "./resources";
import dotenv from 'dotenv'
import { productRouter } from "./resources/product";

dotenv.config();
const app = express();
const PORT = 3000;

// Add global middlewares
app.use(express.json());

// Add routers
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", productRouter);
// Add more routers here....


// mongoDB connection-string
const MONGO_URI =
  'mongodb+srv://12345:12345@cluster0.52i3h.mongodb.net/?retryWrites=true&w=majority';

try {
  // Connect to the MongoDB cluster
  mongoose.connect(MONGO_URI, () => console.log(' Mongoose is connected'));
} catch (e) {
  console.log('could not connect');
}

//Server is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});