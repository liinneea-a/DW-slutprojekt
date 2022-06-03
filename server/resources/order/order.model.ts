import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { Product, ProductSchema } from "../product/product.model";
import { Shipper, ShipperSchema } from "../shipper";
import { Address, addressSchema } from "./address.schema";

export interface Order {
  id: string;
  customer: ObjectId;
  products: Product[];
  shipper: Shipper;
  deliveryAddress: Address[];
  createdAt: Date;
  paymentMethod: string;
  isSent: Boolean;
  totalPrice: number;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: { type: [ProductSchema], required: true },
    shipper: { type: ShipperSchema, required: true },
    deliveryAddress: { type: [addressSchema], required: true },
    isSent: { type: Boolean, required: true, default: false },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const OrderModel = mongoose.model("order", orderSchema);
