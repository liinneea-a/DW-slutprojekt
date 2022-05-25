import express from "express";
import { authorize, ifAdmin, ifAdminOrSelf } from "../middlewares";
import { addOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from "./order.controller";

export const orderRouter = express
  .Router()
  .get("/orders", authorize, ifAdmin, getAllOrders)
  .get("/order/:id", authorize, ifAdminOrSelf, getOrder)
  .post("/order", authorize, ifAdminOrSelf, addOrder)
  .put("/order/:id", authorize, ifAdmin, updateOrder)
  .delete("/order/:id", authorize, ifAdmin, deleteOrder);
