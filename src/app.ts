import express from "express";
import cors from "cors";
import { appRouter } from "./_routes/routes";

export const app = express();


app.use(cors());


app.use(express.json());



// Rutas principales
app.use('/api', appRouter); // Las rutas estarán bajo el prefijo '/api'

// Ruta base para verificar el estado del servidor
app.get("/", (req, res) => {
  res.send("API funcionando");
});

