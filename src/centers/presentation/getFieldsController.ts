import { Request, Response } from "express";
import { ICentersService } from "../domain";
import fieldsConfig from "../../_config/fields.json"; // Importa el archivo de configuración

export const getFieldsController = (centersService: ICentersService) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const entityType = "centers"; // Definimos directamente el tipo de entidad
      const language = req.query.language as keyof typeof fieldsConfig.centers | 'en' | 'es' || 'es'; // Obtén el idioma, 'es' por defecto

      if (!fieldsConfig[entityType]) {
        // Aunque 'centers' está definido, es bueno tener una comprobación por si acaso
        console.error(`Fields configuration not found for entity type: ${entityType}`);
        res.status(500).json({ message: "Internal server configuration error." });
        return;
      }

      const orderedFields = fieldsConfig[entityType][language] || fieldsConfig[entityType]['en'] || [];

      res.status(200).json({
        message: "Fields for centers found",
        data: orderedFields,
      });

    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error.",
          error: error.message,
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
};