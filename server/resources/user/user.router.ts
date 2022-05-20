import express from "express";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller";
import {authorize, ifAdmin, ifAdminOrSelf} from '../middlewares'

export const userRouter = express
  .Router()
  .get("/user", ifAdmin, getAllUsers)
  .get("/user/:id", ifAdmin, ifAdminOrSelf, getUser)
  .post("/user", addUser)
  .put("/user/:id", authorize, ifAdminOrSelf, updateUser)
  .delete("/user/:id", authorize, ifAdminOrSelf, deleteUser);
