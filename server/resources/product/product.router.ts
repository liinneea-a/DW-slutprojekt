import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./product.controller";

export const productRouter = express
  .Router()
  .get("/products", /* adminSecure, */ getAllProducts)
  .get("/product/:id", getProduct)
  .post("/product", addProduct)
  .put("/product/:id", updateProduct)
  .delete("/product/:id", deleteProduct);

  // .patch?
