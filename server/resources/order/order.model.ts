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
    // products: { type: [Schema.Types.ObjectId], required: true },
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

// orderSchema.virtual("quantityOfProducts").get(function () {
//   const priceTotal = 1000;
//   const priceSingle = 200;
//   let quantity: number;

//   for (let x = 0; priceTotal / x > priceSingle; x++) {
//     quantity = x;
//     return quantity;
//   }
// });

export const OrderModel = mongoose.model("order", orderSchema);
