import express from "express";

import { addMedia, deleteMedia, getMedia, updateMedia } from "./media.controller";
import multer from 'multer';
import { authorize, ifAdmin } from "../user/user.middlewares";


//multe middleware
const upload = multer();

export const mediaRouter = express
  .Router()

  //.get("/media", /* adminSecure, */)

  // .get("/media")

  .get('/media/:id', getMedia )
  .post("/media", authorize, ifAdmin, upload.single('media') ,addMedia)
  .delete("/media/:id", authorize, ifAdmin, deleteMedia);

