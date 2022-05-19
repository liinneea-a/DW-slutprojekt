import express from "express";
import { getAllShippers } from "./shipper.controller";

export const shipperRouter = express
  .Router()
  .get("/product", /* adminSecure, */ getAllShippers)
  

  // .patch?
