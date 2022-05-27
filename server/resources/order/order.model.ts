import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { Product, productSchema } from "../product/product.model";
import { Address, addressSchema } from "./address.schema";
import { Shipper, shippperSchema } from "./shipper.schema";

export interface Order {
  id: string;
  customer: ObjectId;
  products: Product[];
  shipper: Shipper;
  deliveryAddress: Address[];
  createdAt: Date;
  // updatedAt: Date;
  paymentMethod: string;
  isSent: Boolean;
  /** virtual */ totalPrice: number;
}

const orderSchema = new mongoose.Schema<Order>(
  {
    customer: { type: Schema.Types.ObjectId, ref: "user", required: true },
    // products: { type: [Schema.Types.ObjectId], required: true },
    products: { type: [productSchema], required: true },
    shipper: { type: shippperSchema, required: true },
    deliveryAddress: { type: [addressSchema], required: true },
    isSent: { type: Boolean, required: true, default: false },
    paymentMethod: { type: String, required: true },
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

orderSchema.virtual("quantityOfProducts").get(function () {
  const priceTotal = 1000;
  const priceSingle = 200;
  let quantity: number;

  for (let x = 0; priceTotal / x > priceSingle; x++) {
    quantity = x;
    return quantity;
  }
});

export const OrderModel = mongoose.model("order", orderSchema);
