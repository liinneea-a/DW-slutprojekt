import express from "express";
import { addShipper, deleteShipper, getAllShippers, getOneShipper } from "./shipper.controller";

export const shipperRouter = express
  .Router()
  .get("/shipper", getAllShippers)
  .get('/shipper/:id', getOneShipper)
  .post("/shipper", addShipper)
  .delete('/shipper/:id', deleteShipper)
  
