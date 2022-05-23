import express from "express";
import { addUser, deleteUser, getAllUsers, getUser, updateUser, loginUser } from "./user.controller";
import {authorize, ifAdmin, ifAdminOrSelf} from '../middlewares'

export const userRouter = express
  .Router()
  // .get("/user", ifAdmin, getAllUsers)
  // .get("/user/:id", ifAdmin, ifAdminOrSelf, getUser)
  // .post("/user", validate, addUser)
  // .put("/user/:id", authorize, ifAdminOrSelf, updateUser)
  // .delete("/user/:id", authorize, ifAdminOrSelf, deleteUser);
  .get("/users", getAllUsers)
  .get("/user/:id", getUser)
  .post('/user/login', loginUser)
  .post("/user", addUser)
  .put("/user/:id", updateUser)
  .delete("/user/:id", deleteUser);