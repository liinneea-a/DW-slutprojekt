import { NextFunction, Request, Response } from "express";
import { UserModel } from "./user";

/** Stops users that aren't logged in */
export const authorize = (req: Request, res: Response, next: NextFunction) => {
  if (req.session?.user) {
    next();
  } else {
    res.status(401).json("You must login");
  }
};

export const ifAdmin = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session)
  if (req.session?.user?.isAdmin) {
    console.log(req.session.user);
    next();
  } else {
    res.status(403).json("in ifAdmin. You don't have the rights to do this...");
  }
};

export const ifAdminOrSelf = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.findById(req.params.id);
  const isAdmin = req.session?.user.isAdmin;
  const myContent = user?.id && user === req.session?.user.id 

  if(!isAdmin && !myContent) {
    res.status(403).json('forbidden')
  }
next();
}