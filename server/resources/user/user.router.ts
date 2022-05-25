import express from "express";
import { addUser, deleteUser, getAllUsers, getLoggedInUser, getUser, loginUser, logoutUser, updateUser } from "./user.controller";

export const userRouter = express
  .Router()
  // .get("/user", ifAdmin, getAllUsers)
  // .get("/user/:id", ifAdmin, ifAdminOrSelf, getUser)
  // .post("/user", validate, addUser)
  // .put("/user/:id", authorize, ifAdminOrSelf, updateUser)
  // .delete("/user/:id", authorize, ifAdminOrSelf, deleteUser);
  
  // TODO: lägg till säkerhet
  .get("/users", getAllUsers)
  .get("/user/:id", getUser)
  .post("/user", addUser)
  .put("/userUpdate/:id", updateUser)
  .delete("/user/:id", deleteUser)
  .post('/login', loginUser)
  .get('/loggedin', getLoggedInUser)
  .delete('/logout', logoutUser)