import express from "express";
import cors from "cors";
import { appRouter } from "./_routes/routes";

export const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', appRouter);

app.get("/", (req, res) => {
  res.send("API funcionando");
});

