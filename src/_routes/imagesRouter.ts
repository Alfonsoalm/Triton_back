// imagesRouter.ts
import express from "express";
import { upload } from "../_middlewares/imageUpload"; // Middleware de multer
import { uploadImage } from "../_services/imagesService";

const imagesRouter = express.Router();

// Ruta para subir imágenes
imagesRouter.post("/upload/:folder", upload.single("image"), uploadImage );

export { imagesRouter };