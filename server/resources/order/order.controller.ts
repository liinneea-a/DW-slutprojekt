import console from 'console';
import { NextFunction, Request, Response } from 'express';
import { OrderModel } from './order.model';

/** GET ALL ORDERS */
export const getAllOrders = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  const orders = await OrderModel.find({});
  if (!orders.length) {
    return res.status(400).json(orders);
  }
  res.status(200).json(orders);
};

/** GET ONE ORDER */
export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const order = await OrderModel.findById(id);

    if (!order) {
       return res.status(400).json(order);
    } 

    res.status(200).json(order);
  } catch (err) {

    res.status(400).json(err);
  }
  // TODO: Who is allowed to use this endpoint?
  // const orders = await OrderModel.findById({}).populate<{ customer: User }>("customer");
};

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  // TODO: How do we handle errors in async middlewares?

    const order = new OrderModel({
      customer: req.session?.user.id,
      products: req.body.products,
      shipper: req.body.shipper,
      deliveryAddress: req.body.deliveryAddress,
      paymentMethod: req.body.paymentMethod
      });
    await order.save();
    res.status(200).json(order);

};

export const updateOrder = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const order = await OrderModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    console.log(order);

    if(!order) {
      return res.status(400).json(order)
    }

    await order.save();
    res.status(200).json({
      old: order,
      new: req.body,
    });
  } catch (err) {
    console.log('update order error');
    res.status(400).json(err);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findByIdAndDelete(id);

    res.status(200).json(order);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json(err.message);
    }
  }
};

// const ifNoOrderFound = (req: Request, res: Response, order: Order, errCode: number) => {
//   if(!order) {
//     return res.status(400).json(order);
//   }
// }
