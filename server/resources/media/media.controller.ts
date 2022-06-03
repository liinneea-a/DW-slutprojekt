import { NextFunction, Request, Response } from 'express';
//import { rmSync, write } from 'fs';
import { GridFSFile } from 'mongodb';
import { Types } from 'mongoose';
import { pipeline, Readable } from 'stream';
import { bucket } from './media.model';
import sharp from 'sharp';

export const getMedia = async (req: Request, res: Response) => {
  const _id = new Types.ObjectId(req.params._id);
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

  const readableStream = Readable.from(req.file.buffer);
  const writableStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
    //metadata: { thumbnail: false }
  });

  const transformer = sharp();

  transformer
  .clone()
  .resize({
    width: 500,
    height: 500,
    fit: 'cover',
    position: sharp.strategy.entropy,
  })
  .pipe(writableStream)
  .on('finish', (file: GridFSFile) => {
    res.status(200).json(file);
  });

readableStream
  .pipe(transformer)
  .on('error', (error: unknown) => {
    throw new Error();
    //console.log('done', file);
    //res.status(201).json(file);
  })

/*   const { originalname, mimetype, buffer } = req.file;
  const thumbname = 'thumb ' + originalname;
  
 
  bucket.openUploadStream(thumbname, {
    contentType: mimetype,
    metadata: { thumbnail: true },
  });

  const onFinishUpload = (file: GridFSFile) => {
    images.push(file);
    if (images.length === 2) {
      res.status(201).json(images);
    }
  }; */

  

  const images: GridFSFile[] = [];

 
    //.on('error', next);

    //måste pipeas
   // readableStream.pipe(transformer).on('error', next);
    
};


export const updateMedia = async (req: Request, res: Response) => {};

export const deleteMedia = async (req: Request, res: Response) => {
  const _id = new Types.ObjectId(req.params._id);
  const file = await bucket.find({ _id }).next();
  if (!file || !file.contentType) {
    return res.status(404).json('media file with this id does not exist');
  }
  await bucket.delete(_id);
  res.status(204).json(null);
};
