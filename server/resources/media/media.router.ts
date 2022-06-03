import express from "express";
import multer from 'multer';
import { addMedia, deleteMedia, getMedia } from "./media.controller";

//multe middleware
const upload = multer();

export const mediaRouter = express
  .Router()
  .get("/media")
  .get('/media/:id', getMedia )
  .post("/media", upload.single('media') ,addMedia)
  .delete("/media/:id", deleteMedia);

