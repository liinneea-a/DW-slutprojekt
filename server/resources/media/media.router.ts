import express from "express";
import { addMedia, deleteMedia, getMedia, updateMedia } from "./media.controller";
import multer from 'multer'

//multe middleware
const upload = multer();

export const mediaRouter = express
  .Router()
  .get("/media", /* adminSecure, */)
  .get('/media/:id', getMedia )
  .post("/media", upload.single('media') ,addMedia)
  .delete("/media/:id", deleteMedia);

