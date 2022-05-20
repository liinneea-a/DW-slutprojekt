import express from "express";
require("express-async-errors");
import mongoose from "mongoose";
import { userRouter, orderRouter } from "./resources";
import { ErrorRequestHandler } from "./error";

const app = express();

// Add global middlewares
app.use(express.json());

// Add routers
app.use("/api", userRouter);
app.use("/api", orderRouter);
// app.use("/api", productRouter);
// Add more routers here....

// Error handler
app.use(ErrorRequestHandler);

// Connect to DB & start server
mongoose.connect("mongodb://localhost:27017/layered-backend", (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connection to database established!");
    app.listen(3000, () =>
      console.log("Server is running on http://localhost:3000")
    );
  }
});
