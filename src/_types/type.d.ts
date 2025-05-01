// types.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File; // Define el tipo de 'file' para una sola subida
      files?: Express.Multer.File[]; // Opcional: si planeas manejar múltiples archivos
    }
  }
}
