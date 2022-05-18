import mongoose, { Schema, Types } from "mongoose";
import { Product } from '../product/product.model';
import { Delivery, deliverySchema } from "./delivery.schema";

export interface Order {
  customer: Types.ObjectId;
  products: Product[];
  delivery: Delivery;
  createdAt: Date;
  // updatedAt: Date;
  paymentMethod: string;
  isSent: Boolean;
  
}

const orderSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: { type: Schema.Types.ObjectId, ref: "product", required: true },
    delivery: { type: deliverySchema, required: true },
    isSent: { type: Boolean, required: true, default: false},
    paymentMethod: { type: String, required: true},

  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model<Order>("order", orderSchema);
