import express from "express";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller";

export const userRouter = express
  .Router()
  .get("/user", /* adminSecure, */ getAllUsers)
  .get("/user/:id", getUser)
  .post("/user", addUser)
  .put("/user/:id", updateUser)
  .delete("/user/:id", deleteUser);
