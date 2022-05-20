import mongoose from "mongoose";

export interface Shipper {
  cost: number;
  deliveryDate: Date;
  shipper: string;
}

export const shippperSchema = new mongoose.Schema({
  cost: { type: Number, required: true },
  daysToDelivery: { type: Number, required: true },
  shipper: { type: String, required: true },
});
