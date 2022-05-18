import mongoose from "mongoose";
import { Address, addressSchema } from "./address.schema";
import { Shipper, shippperSchema } from "./shipper.schema";

export interface Delivery {
    shipper: Shipper;
    address: Address;
}

export const deliverySchema = new mongoose.Schema({
    shipper: { type: shippperSchema, required: true},
    address: { type: addressSchema, required: true}
})

// export const addressModel = mongoose.model<Address>("address", addressSchema);
