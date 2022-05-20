import { NextFunction, Request, Response } from 'express';
import { orderRouter } from '../order';
import { User, UserModel } from './user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  try {
    const users = await UserModel.find({});
    if(!users.length) {
     return res.status(400).json('No users found')
    }
    res.status(200).json(users);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getUser = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  try {
    const user = await UserModel.findById(req.params.id);
    if(!user) {
      return res.status(400).json(user)
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const addUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  // TODO: How do we handle errors in async middlewares?
  try {
    const user = new UserModel(req.body);
    await user.save();
    console.log(user.fullname);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  
  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    }).select('+password');

    console.log(user);
    if (!user) {
     return res.status(400).json('no user found');
    }
    user?.save();
    res.status(200).json({ old: user, new: req.body });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json(err.message);
    }
  }
};
