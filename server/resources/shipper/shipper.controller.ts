
import { NextFunction, Request, Response } from "express";
import { Shipper, ShipperModel } from "./shipper.model";

export const getAllShippers = async (req: Request, res: Response) => {
  const shippers = await ShipperModel.find({})
  res.status(200).json(shippers);
};

export const getOneShipper = async (req: Request, res: Response) => {
  try {
    const shipper = await ShipperModel.findById(req.params.id);
    if(!shipper) {
      return res.status(400).json(shipper)
    }
    res.status(200).json(shipper);
  } catch (err) {
    res.status(400).json(err);
  }
}

export const addShipper = async (req: Request<{}, {}, Shipper>, res: Response, next: NextFunction) => {
  try {
    const shipper = new ShipperModel(req.body);
    await shipper.save();
    res.status(200).json(shipper);
  } catch (err) {
    next(err);
  }
};

export const deleteShipper = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const shipper = await ShipperModel.findByIdAndDelete(id);
   
    if(!shipper) {
      return res.status(404).json(shipper);
    }

    res.status(200).json(shipper);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json(err.message);
    }
  }
}