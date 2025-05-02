
// server.ts
import { app } from "./app";
import { connectDB, sequelize } from "./_config/connection";
const PORT = process.env.PORT || 3030;

(async () => {
  await connectDB(); // Se intenta la conexión a la base de datos
  await sequelize.sync(); // Esto sincroniza los modelos con la BD
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://tritonback-production.up.railway.app:${PORT}`);
  });
})();
