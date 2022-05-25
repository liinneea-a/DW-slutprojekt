import express from "express";
import { addUser, deleteUser, getAllUsers, getLoggedInUser, getUser, loginUser, logoutUser, updateUser } from "./user.controller";
import { authorize, ifAdmin, ifAdminOrSelf, setUpdateData } from "./user.middlewares";



export const userRouter = express
  .Router()
  .get("/users", authorize, ifAdmin, getAllUsers) //fungerar
  .get('/loggedin', getLoggedInUser) // fungerar
  .get("/user/:id", authorize, ifAdminOrSelf, getUser) //fungerar
  .post("/user", addUser) //fungerar
  .post('/login', loginUser) // fungerar

  .put("/user/:id", authorize, ifAdminOrSelf, updateUser)

  .delete("/user/:id", authorize, ifAdminOrSelf, deleteUser)
  .delete('/logout', authorize, logoutUser);
  
  // .get("/users", authorize, ifAdmin, getAllUsers) 
  // .get('/loggedin', getLoggedInUser)
  // .get("/user/:id", ifAdmin, ifAdminOrSelf, getUser)
  // .post("/user", addUser)
  // .post('/login', loginUser)
  // .put("/user/:id", authorize, ifAdminOrSelf, updateUser)
  // .delete("/user/:id", authorize, ifAdminOrSelf, deleteUser)
  // .delete('/logout', authorize, logoutUser);

  // 1. If self = update email & password ONLY on self
  // 2. ifAdmin = update isAdmin ONLY on all