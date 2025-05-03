import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize( // Fallback si por alguna razón MYSQL_URL no está definida
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
    }
  );

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la base de datos MySQL");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};