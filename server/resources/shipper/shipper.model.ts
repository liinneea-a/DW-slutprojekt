import mongoose, { Types } from "mongoose";

export interface Shipper {
  shipper: string,
  cost: number,
  deliveryDays: number
}

export const ShipperSchema = new mongoose.Schema(
  {
    shipper: {type: String, required: true},
    cost: {type: Number, required: true},
    deliveryDays: {type: Number, required: true},
  }

);

export const ShipperModel = mongoose.model<Shipper>("shipper", ShipperSchema);
