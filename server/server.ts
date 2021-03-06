
import cookieSession from "cookie-session";
import dotenv from 'dotenv';
import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { orderRouter, productRouter, shipperRouter, userRouter } from "./resources";
import { mediaRouter } from "./resources/media/media.router";
require("express-async-errors");

dotenv.config();
const app = express();
const PORT = 4000;

app.use(express.json());

app.use(
  cookieSession({
    secret: 'th1s1SaK3y',
    sameSite: 'strict',
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60000,
  })
)

app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", productRouter);
app.use("/api", shipperRouter);
app.use('/api', mediaRouter);


//error handler
const errorRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json(err.message);
}
app.use(errorRequestHandler);

// mongoDB connection
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
