import mongoose from "mongoose";

export interface Address {
  fullName: string;
  street: string;
  zipcode: number;
  city: string;
}

export const addressSchema = new mongoose.Schema({
  fullName: { type: String, required: true} ,
  street: { type: String, required: true },
  zipcode: { type: Number, required: true },
  city: { type: String, required: true },
});

//export const addressModel = mongoose.model<Address>("address", addressSchema);