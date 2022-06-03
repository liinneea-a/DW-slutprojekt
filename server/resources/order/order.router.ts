import express from "express";
import { authorize, ifAdmin } from "../user";
import { ifAdminOrSelf } from "../user/user.middlewares";
import {
  addOrder,
  getAllOrders,
  getOrder,
  updateOrder
} from "./order.controller";

export const orderRouter = express
  .Router()
  .get("/orders", authorize, getAllOrders) 
  .get("/order/:id", authorize, ifAdminOrSelf, getOrder)
  .post("/order", authorize, addOrder) 
  .put("/order/:id", authorize, ifAdmin, updateOrder);

