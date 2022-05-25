import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { encryptPassword, User, UserModel } from './user.model';

export const getAllUsers = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  try {
    const users = await UserModel.find({});
    if (!users.length) {
      return res.status(400).json('No users found');
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
    if (!user) {
      return res.status(400).json(user);
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let FoundUser = await UserModel.findOne({ email: req.body.email });
    if (FoundUser) return res.status(409).json('That email is already in use.');
    const user = new UserModel(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email }).select(
      '+password'
    );
    console.log(user);

    if (!user) {
      return res.status(404).send('User not found');
    }
    console.log("req.body.password: ", req.body);
    console.log("user.password: ", user.password);

    let matchingPassword = await bcrypt.compare(
      req.body.password,
      user.password!
    );
    console.log(matchingPassword);

    if (!matchingPassword) {
      return res.status(401).json('Wrong email or password');
    }

    if (!req.session) {
      return res.status(500).json('Missing session object');
    }

    delete user.password;
    req.session.user = user;
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  try {
    if (!req.session?.isPopulated) {
      return res.status(401).send('You are not logged in');
    } else {
      res.json(req.session);
    }
  } catch (err: unknown) {
    return res.status(400).json(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.body;

  const userMe: User = {email: req.body, isAdmin: req.session?.isAdmin}
  // console.log("password: ", password);
  // console.log("req.body: ", req.body)

  // const salt = bcrypt.genSalt(10)
  // const newPassword = await bcrypt.hash(password);

  // Ska bara kunna hämtas om man är self eller admin
  // Kan göra två olika funktioner beroende på vad man är
  // om self hämtas datan från req.session 
  // om admin hämtas user från DB
  // alltså inte uppdatera till hela req.body(om man skickat in ett helt user objekt)
  //iställer bara skicka med datan ska som ska ändras


  try {
    const user = await UserModel.findByIdAndUpdate(id, userMe, {
      useFindAndModify: false,
    }).select('+password');

    console.log(user);

    if (!user) {
      return res.status(400).json('no user found');
    }
    user.save();

    res.status(200).json({ old: user, new: userMe });
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

export const logoutUser = async (req: Request, res: Response) => {
  if (!req.session?.user) {
    return res.status(401).json('You are not logged in.');
  }

  req.session = null;
  res.json('You have logged out.');
};
