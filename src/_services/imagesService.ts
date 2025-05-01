// src/_services/imagesService.ts
import { Request, Response } from "express";

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "No se envió ningún archivo." });
    return;
  }
  //const folder = req.params.folder; 

  // Si quieres devolver solo la ruta relativa:
  const filePath = `/uploads/centers/${req.file.filename}`;

  // Devuelve solo la respuesta, sin un valor de retorno explícito.
  res.status(200).json({ filePath });
};
