import mongoose, { Schema, Types } from "mongoose";

export interface Product {
  customer: Types.ObjectId;
  products: string[];
  imageId: Types.ObjectId;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
    imageId: {type: Schema.Types.ObjectId, required: true},
    balance: {type: Number, required: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    legacy: {type: Boolean, default: false}
    // version?
  }

);

productSchema.virtual('imageUrl').get(function() {
  return "/api/media/" + " " + this.imageId;
})

export const ProductModel = mongoose.model<Product>("product", productSchema);
