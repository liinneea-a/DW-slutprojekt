import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { encryptPassword, User, UserModel } from './user.model';

/**------GET ALL USERS---------- */

export const getAllUsers = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?

  const users = await UserModel.find({}).select('+password');
  if (!users.length) {
    return res.status(400).json('No users found');
  }
  res.status(200).json(users);
};

/**------GET ONE USER---------- */

export const getUser = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?

  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return res.status(400).json(user);
  }
  res.status(200).json(user);
};

/**------ADD USER---------- */

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.isPopulated) {
    return res
      .status(403)
      .json('you cant create an account while being logged in');
  }

  let FoundUser = await UserModel.findOne({ email: req.body.email });
  if (FoundUser) return res.status(409).json('That email is already in use.');
  const user = new UserModel(req.body);
  await user.save();
  res.status(200).json(user);
};

/**------LOG IN---------- */

export const loginUser = async (req: Request, res: Response) => {
  if (req.session?.isPopulated) {
    return res.status(403).json(req.body);
  }

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

/**------GET LOGGED IN USER---------- */

export const getLoggedInUser = async (req: Request, res: Response) => {
  if (!req.session?.isPopulated) {
    return res.status(401).send('You are not logged in');
  } else {
    res.json(req.session);
  }
};

/**------UPDATE USER---------- */

export const updateUser = async (
  req: Request,
  res: Response,
) => {
  console.log('in update user ')
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

/**------DELETE USER---------- */

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserModel.findByIdAndDelete(id);
  res.status(200).json(user);
};

/**------LOG OUT---------- */

export const logoutUser = async (req: Request, res: Response) => {
  req.session = null;
  res.status(200).json(req.session);
};
