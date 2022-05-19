
import { NextFunction, Request, Response } from "express";
import { User } from "../user";
import { Shipper, ShipperModel } from "./shipper.model";

export const getAllShippers = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const shippers = await ShipperModel.find({})//.populate<{ customer: User }>("customer"); ?
  res.status(200).json(shippers);
};