import mongoose from "mongoose";

export interface Product {
  id: string;
  name: number;
  description: string;
  price: number;
  // imageId: Schema.Types.ObjectId;
  imageId: string;
  stock: number;
  // image: {type: String, required: true},
  categories: string[];
  quantity?: number;
  // legacy: boolean;
}

export const productSchema = new mongoose.Schema<Product>(
  {
    name: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    // imageId: { type: Schema.Types.ObjectId, required: true },
    imageId: { type: String, required: false },
    stock: { type: Number, required: true },
    // image: {type: String, required: true},
    categories: { type: [String], required: true },
    // legacy: { type: Boolean, required: true, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("imageUrl").get(function () {
  return "/api/media/" + " " + this.imageId;
});

productSchema.virtual("quantity").get(function (quantity: number) {
  
})

export const ProductModel = mongoose.model("product", productSchema);
