import mongoose, { Schema, Types } from "mongoose";

export interface Product {
  name: string,
  description: string,
  price: number,
  imageId: Schema.Types.ObjectId,
  stock: number,
  // image: {type: String, required: true},
  categories: string[],
  legacy: boolean
}

const productSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    imageId: {type: Schema.Types.ObjectId, required: true},
    stock: {type: Number, required: true},
    // image: {type: String, required: true},
    categories: {type: [String], required: true},
    legacy: {type: Boolean, required: true, default: false}
    // version?
  }

);

productSchema.virtual('imageUrl').get(function() {
  return "/api/media/" + " " + this.imageId;
})



export const ProductModel = mongoose.model<Product>("product", productSchema);
