import express from "express";
import { adminSecure } from "../middlewares";
import { getAllOrders, addOrder, updateOrder, deleteOrder } from "./product.controller";

export const orderRouter = express
  .Router()
  .get("/order", /* adminSecure, */ getAllOrders)
  .post("/order", addOrder)
  .put("/order/:id", updateOrder)
  .delete("/order/:id", deleteOrder);
