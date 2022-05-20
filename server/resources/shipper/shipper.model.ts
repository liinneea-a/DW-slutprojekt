import mongoose, { Types } from "mongoose";

export interface Shipper {
  shipper: string,
  cost: number,
  days: number
}

const shipperSchema = new mongoose.Schema(
  {
    shipper: {type: String, required: true},
    cost: {type: Number, required: true},
    days: {type: Number, required: true},
  }

);

export const ShipperModel = mongoose.model<Shipper>("shipper", shipperSchema);
