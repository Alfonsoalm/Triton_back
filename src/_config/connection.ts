import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DB_URL;

export const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: "mysql",
      // Opciones adicionales que podrías necesitar:
      dialectOptions: {
        ssl: process.env.DATABASE_SSL === 'true' ? {
          rejectUnauthorized: true,
        } : undefined,
      },
    })
  : new Sequelize( // Fallback si por alguna razón MYSQL_URL no está definida
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