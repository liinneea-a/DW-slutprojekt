import express from "express";
import { getAllUsers } from "./user.controller";
import { authorize } from "./user.middlewares";



export const userRouter = express
  .Router()
  .get("/users", authorize, getAllUsers)
  //.get('/loggedin', getLoggedInUser)
  // .get("/user/:id", ifAdmin, ifAdminOrSelf, getUser)
  // .post("/user", addUser)
  // .post('/login', loginUser)
  // .put("/user/:id", authorize, ifAdminOrSelf, updateUser)
  // .delete("/user/:id", authorize, ifAdminOrSelf, deleteUser)
  // .delete('/logout', authorize, logoutUser);
  
  //TODO: lägg till säkerhet
  // .get("/users", getAllUsers)
  // .get("/user/:id", getUser)
  // .post("/user", addUser)
  // .put("/user/:id", updateUser)
  // .delete("/user/:id", deleteUser)
  // .post('/login', loginUser)
  // .get('/loggedin', getLoggedInUser)
  // .delete('/logout', logoutUser)