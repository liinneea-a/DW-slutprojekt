
import { NextFunction, Request, Response } from "express";
import { Shipper, ShipperModel } from "./shipper.model";

export const getAllShippers = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const shippers = await ShipperModel.find({})//.populate<{ customer: User }>("customer"); ?
  res.status(200).json(shippers);
};

export const addShipper = async (req: Request<{}, {}, Shipper>, res: Response, next: NextFunction) => {
  // TODO: How do we handle errors in async middlewares?
  try {
    const shipper = new ShipperModel(req.body);
    await shipper.save();
    res.status(200).json(shipper);
  } catch (err) {
    next(err);
  }
};