import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "./user.model";

export const getAllUsers = async (req: Request, res: Response) => {
  // TODO: Who is allowed to use this endpoint?
  try {
    const users = await UserModel.find({});
    if (!users.length) {
      return res.status(400).json("No users found");
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
    if (FoundUser) return res.status(409).json("That email is already in use.");
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
      "+password"
    );
    console.log(user);
    if (!user) return res.status(404).send("User not found");
    let matchingPassword = await bcrypt.compare(
      req.body.password,
      user.password!
    );
    if (!matchingPassword) {
      return res.status(401).json("Wrong email or password");
    }
    if (!req.session) {
      return res.status(500).json("Missing session object");
    }
    delete user.password;
    req.session.user = user;
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  if (!req.session) return res.status(401).send("You are not logged in");

  res.json(req.session.user);
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    }).select("+password");

    console.log(user);
    if (!user) {
      return res.status(400).json("no user found");
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

export const logoutUser = async (req: Request, res: Response) => {
  if (!req.session?.user) return res.status(401).json("You are not logged in.");
  req.session = null;
  res.json("You have logged out.");
};
