import { NextFunction, Request, Response } from 'express';
import { write } from 'fs';
import { GridFSFile } from 'mongodb';
import { Readable } from 'stream';
import { bucket } from './media.model';

export const getMedia = async (req: Request, res: Response) => {};

export const addMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return;
    //throw new HttpError(400, "no file was sen. Make sure to name your input to media")
  }

  console.log(req.file);
  const readableStream = Readable.from(req.file.buffer);
  const writableStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });
  readableStream
    .pipe(writableStream)
    .on('finish', (file: GridFSFile) => {
        console.log('done', file);
        res.status(201).json(file);
    })
    .on('error', next)


};

export const updateMedia = async (req: Request, res: Response) => {};

export const deleteMedia = async (req: Request, res: Response) => {};
