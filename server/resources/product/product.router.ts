import express from "express";
import { addProduct, deleteProduct, getAllProducts, getOneCategory, getProduct, updateProduct } from "./product.controller";

export const productRouter = express
  .Router()
  .get("/products", /* adminSecure, */ getAllProducts)
  .get("/product/:id", getProduct)
  .get('/products/category/:category', getOneCategory)
  .post("/product", addProduct)
  .put("/product/:id", updateProduct)
  .delete("/product/:id", deleteProduct);

  // .patch?
