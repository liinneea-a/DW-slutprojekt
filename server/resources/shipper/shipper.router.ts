import express from "express";
import { getAllShippers, addShipper } from "./shipper.controller";

export const shipperRouter = express
  .Router()
  .get("/shipper", /* adminSecure, */ getAllShippers)
  .post("/shipper", addShipper)
  

  // .patch?
