import express from "express";
import { addOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from "./order.controller";

export const orderRouter = express
  .Router()
  .get("/orders", getAllOrders)
  .get("/order/:id", getOrder)
  .post("/order", addOrder)
  .put("/order/:id", updateOrder)
  .delete("/order/:id", deleteOrder);
