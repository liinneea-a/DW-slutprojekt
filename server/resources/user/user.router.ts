import express from "express";
import { addUser, deleteUser, getAllUsers, getUser, updateUser, logoutUser } from "./user.controller";
import { adminOnly, auth, selfOrAdmin, validBody } from "./utils/user.middlewares"

export const userRouter = express
  .Router()
  .get("/user", auth, adminOnly, getAllUsers)
  .get("/user/:id", auth, selfOrAdmin, getUser)
  .post("/user", validBody, addUser)
  .put("/user/:id", auth, selfOrAdmin, validBody, updateUser)
  .delete("/user/:id", auth, logoutUser);
  .delete("/user/:id", auth, selfOrAdmin, deleteUser);
