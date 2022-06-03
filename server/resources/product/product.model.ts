import mongoose from "mongoose";

export interface Product {
  id: string,
  name: string;
  description: string;
  price: number;
  imageId: string;
  stock: number;
  categories: string[];
  quantity?: number;
}

export const ProductSchema = new mongoose.Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageId: { type: String, required: false },
    stock: { type: Number, required: true },
    categories: { type: [String], required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.virtual("imageUrl").get(function () {
  return "/api/media/" + " " + this.imageId;
});

ProductSchema.virtual("quantity").get(function (quantity: number) {
  
})

export const ProductModel = mongoose.model("product", ProductSchema);
