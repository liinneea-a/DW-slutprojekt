import { NextFunction, Request, Response } from 'express';
import { rmSync, write } from 'fs';
import { GridFSFile } from 'mongodb';
import { Types } from 'mongoose';
import { Readable } from 'stream';
import { bucket } from './media.model';

export const getMedia = async (req: Request, res: Response) => {
  const _id = new Types.ObjectId(req.params.id);
  const file = await bucket.find({ _id }).next();
  if (!file || !file.contentType) {
    return res.status(404).json('media file with this id does not exist');
  }

  res.setHeader('Content-Type', file.contentType);

  const readableStream = bucket.openDownloadStream(_id);
  readableStream.pipe(res);
};

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
    .on('error', next);
};

export const updateMedia = async (req: Request, res: Response) => {};

export const deleteMedia = async (req: Request, res: Response) => {
  const _id = new Types.ObjectId(req.params.id);
  const file = await bucket.find({ _id }).next();
  if (!file || !file.contentType) {
    return res.status(404).json('media file with this id does not exist');
  }
  await bucket.delete(_id);
  res.status(204).json(null);
};
