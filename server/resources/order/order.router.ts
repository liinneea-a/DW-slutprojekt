import express from "express";
import { authorize, ifAdmin } from "../user";
import { ifAdminOrSelf } from "../user/user.middlewares";
// import { ifAdminOrSelf } from "../user/user.middlewares";
import { addOrder, deleteOrder, getAllOrders, getOrder, updateOrder } from "./order.controller";

export const orderRouter = express
  .Router()
  .get("/orders", authorize, ifAdmin, getAllOrders) //fungerar
  .get("/order/:id", authorize, ifAdmin, getOrder)
  .post("/order", authorize, addOrder) // fungerar
  .put("/order/:id", authorize, ifAdmin, updateOrder)
  //.delete("/order/:id", authorize, ifAdmin, deleteOrder);






  //KLAR Administratörer ska kunna se en lista på alla gjorda beställningar (G)

  //KLAR En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G)

  // När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG)

  // KLAR Administratörer ska kunna markera beställningar som skickade (VG)