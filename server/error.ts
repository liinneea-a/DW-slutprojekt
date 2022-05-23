import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";

declare;
global;

export const ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _: Function
) => {
  console.error(req.method, req.path, error);

  if (res.writableEnded) {
    return console.error(
      "Respnse has been sent even though there was an error..."
    );
  }

  // Mongoose validation error
  if (error instanceof MongooseError.StrictModeError) {
    return res.status(400).json(error.message);
  }

  if (error instanceof MongooseError.ValidationError) {
    return res.status(400).json(error.message);
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json(error.message);
  }

  if (error instanceof Error) {
    let status = error.status || error.statusCode || 500;
    return res.status(status).json(error.message);
  }

  return res.status(500).json("Unknown server error");
};

export class HttpError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}
