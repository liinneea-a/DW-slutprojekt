import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getOneCategory,
  getProduct,
  updateProduct
} from "./product.controller";

export const productRouter = express
  .Router()
  .get("/products", getAllProducts)
  .get("/products/:id", getProduct)
  .get("/products/category/:category", getOneCategory)
  .post("/product", addProduct)
  .put("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct)
