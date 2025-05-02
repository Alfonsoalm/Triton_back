import express from "express";
import cors from "cors";
import { appRouter } from "./_routes/routes";

export const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'https://tritonfront-production.up.railway.app',  // Asegúrate de que esta URL sea correcta
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Si usas cookies o sesiones
}));
app.options('*', cors()); // Responde a los preflight requests con las cabeceras adecuadas

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://tritonfront-production.up.railway.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Rutas principales
app.use('/api', appRouter); // Las rutas estarán bajo el prefijo '/api'

// Ruta base para verificar el estado del servidor
app.get("/", (req, res) => {
  res.send("API funcionando");
});

