import mongoose from "mongoose";

export interface Address {
  fullname: string;
  street: string;
  zipcode: number;
  city: string;
}

export const addressSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  street: { type: String, required: true, maxlength: 50 },
  zipcode: { type: Number, required: true, min: 10000, max: 99999 },
  city: { type: String, required: true, maxlength: 50 },
});

//export const addressModel = mongoose.model<Address>("address", addressSchema);