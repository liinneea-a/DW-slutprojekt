import mongoose, { Schema, Types } from "mongoose";
import { Product } from '../product/product.model';
import { Address, addressSchema } from "./address.schema";
import { Shipper, shippperSchema } from "./shipper.schema";

export interface Order {
  customer: Types.ObjectId;
  products: Product[];
  shipper: Shipper;
  deliveryAddress: Address;
  createdAt: Date;
  // updatedAt: Date;
  paymentMethod: string;
  isSent: Boolean;
  /** virtual */totalPrice: number
  
}

const orderSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: { type: [Schema.Types.ObjectId], ref: "product", required: true },
    shipper: { type: shippperSchema, required: true},
    deliveryAddress: { type: addressSchema, required: true},
    isSent: { type: Boolean, required: true, default: false},
    paymentMethod: { type: String, required: true}

  },
  {
    timestamps: true,
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
  }
);

/** function to set a virtual for total price of products in cart
 * instead of saving total as a variable
 */
// orderSchema.virtual('totalPrice').get(function() {
//   let sum;
//     for(let product of products) {
//       sum += this.price;
//       //quantituy?
//       return sum;
//     }
// })

export const OrderModel = mongoose.model<Order>("order", orderSchema);
