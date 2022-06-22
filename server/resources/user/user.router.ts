import express from "express";
import { addUser, deleteUser, getAllUsers, getLoggedInUser, getUser, loginUser, logoutUser, updateUser } from "./user.controller";
import { authorize, ifAdmin, ifAdminOrSelf } from "./user.middlewares";



export const userRouter = express
  .Router()
  .get("/users", authorize, ifAdmin, getAllUsers) 
  .get('/loggedin', getLoggedInUser) 
  .get("/user/:id", authorize, ifAdminOrSelf, getUser) 
  .post("/user", addUser) 
  .post('/login', loginUser) 

  .put("/user/:id", authorize, ifAdminOrSelf, updateUser)

  .delete("/user/:id", authorize, ifAdminOrSelf, deleteUser)
  .delete('/logout', authorize, logoutUser);
  