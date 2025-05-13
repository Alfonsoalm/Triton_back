import multer, { StorageEngine } from "multer";
import { Request } from "express";
import fs from "fs";
import path from "path";

const UPLOAD_BASE_DIR = "/app/uploads"; // Define la ruta base del volumen de Railway

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const folder = req.params.folder;
        const uploadDir = path.join(UPLOAD_BASE_DIR, folder);
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log(`Intentando guardar en: ${uploadDir}`);
        cb(null, uploadDir);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

export const upload = multer({ storage });