import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { encryptPassword, User, UserModel } from './user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?

  const users = await UserModel.find({}).select('+password');
  if (!users.length) {
    return res.status(400).json('No users found');
  }
  res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?

  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return res.status(400).json(user);
  }
  res.status(200).json(user);
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let FoundUser = await UserModel.findOne({ email: req.body.email });
  if (FoundUser) return res.status(409).json('That email is already in use.');
  const user = new UserModel(req.body);
  await user.save();
  res.status(200).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  let user = await UserModel.findOne({ email: req.body.email }).select(
    '+password'
  );

  if (!user) {
    return res.status(404).send('User not found');
  }

  let matchingPassword = await bcrypt.compare(
    req.body.password,
    user.password!
  );

  if (!matchingPassword) {
    return res.status(401).json('Wrong email or password');
  }

  if (!req.session) {
    return res.status(500).json('Missing session object');
  }

  delete user.password;
  req.session.user = user;
  res.json(user);
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  if (!req.session?.isPopulated) {
    return res.status(401).send('You are not logged in');
  } else {
    res.json(req.session);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) return res.status(404).json('makjskbdha');

  (user.email = req.body.email),
    (user.password = req.body.password),
    (user.isAdmin = req.body.isAdmin);
  user.save();

  // Update the cookie session
  delete user.password;
  req.session = user;

  console.log('user: ', user);
  res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserModel.findByIdAndDelete(id);
  res.status(200).json(user);
};

export const logoutUser = async (req: Request, res: Response) => {
  if (!req.session?.user) {
    return res.status(401).json('You are not logged in.');
  }

  req.session = null;
  res.json('You have logged out.');
};


