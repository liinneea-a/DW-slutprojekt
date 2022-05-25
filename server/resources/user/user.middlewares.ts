import { NextFunction, NextFunction, Request, Response } from "express";
import { UserModel } from "./user.model";

/** Stops users that aren't logged in */
export const authorize = (req: Request, res: Response, next: NextFunction) => {
  
    if (req.session?.isPopulated) {
      next();
    } else {
     return res.status(401).json("You must login");
    }
  };
  
  export const ifAdmin = (req: Request, res: Response, next: NextFunction) => {
   
    if (req.session?.isAdmin) {
      console.log(req.session);
      next();
    } else {
     return res.status(403).json("in ifAdmin. You don't have the rights to do this...");
    }
  };
  
  export const ifAdminOrSelf = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findById(req.params.id);
    const myAccount = user?.id === req.session?.id; 

    console.log(user?.id);
    console.log(req.session?.id)

  

    const isAdmin = req.session?.isAdmin;

    if (myAccount && !isAdmin) {
      return next(myAccount, isAdmin);

    } else if (!myAccount && isAdmin) {
      return next();

    } else if (myAccount && isAdmin){
      return next();

    } else if(!isAdmin && !myAccount) {
      return res.status(403).json('You are not admin and the user youre looking for is not you')
    } 

  }

  export const setUpdateData = (myAccount: boolean, isAdmin: boolean) => {
    return (req: Request, res: Response, next: NextFunction) => {
      next();
    }

  }