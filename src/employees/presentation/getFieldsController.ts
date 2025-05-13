import { Request, Response } from "express";
import { IEmployeesService } from "../domain";
import config from "../../_config/fields.json"; // el JSON con los campos permitidos

export const getFieldsController = (employeesService: IEmployeesService) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const fields = await employeesService.getFields();
      const allowedFields = config.employees?.en || [];
      const filteredFields = fields.filter((field: any) =>
        allowedFields.includes(field.Field)
      );

      res.status(200).json({
        message: "Fields found",
        data: filteredFields
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error.",
          error: error.message
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
};
