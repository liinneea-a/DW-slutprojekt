import express from "express";
import { getAllShippers, addShipper, getOneShipper, deleteShipper } from "./shipper.controller";

export const shipperRouter = express
  .Router()
  .get("/shipper", /* adminSecure, */ getAllShippers)
  .get('/shipper/:id', getOneShipper)
  .post("/shipper", addShipper)
  .delete('/shipper/:id', deleteShipper)
  

  // .patch?
