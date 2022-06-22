import mongoose, { Schema, Types } from "mongoose";

export interface Product {
  id: string,
  name: string;
  description: string;
  price: number;

  image: string;
  //imageId: string; //|| Types.ObjectId;
  imageId: Types.ObjectId ;//string;

  stock: number;
  categories: string[];
  quantity?: number;
}

export const ProductSchema = new mongoose.Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    //image: { type: String, required: true },
    imageId: { type: Schema.Types.ObjectId, required: true },
    //imageId: { type: String, required: false}, //|| {type: Schema.Types.ObjectId, required: true},
    //imageUploadId: { type: Schema.Types.ObjectId, required: true},//{ type: String, required: false },

    stock: { type: Number, required: true },
    categories: { type: [String], required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


productSchema.virtual("imageUrl").get(function () {
  return "/api/media/" + this.imageId;
});

/* productSchema.virtual("quantity").get(function (quantity: number) {

ProductSchema.virtual("imageUrl").get(function () {
  return "/api/media/" + " " + this.imageId;
});

ProductSchema.virtual("quantity").get(function (quantity: number) {

  
}) */

export const ProductModel = mongoose.model("product", ProductSchema);
