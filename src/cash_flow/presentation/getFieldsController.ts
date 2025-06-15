import { Request, Response } from "express";
import { ICashFlowsService } from "../domain";

export const getFieldsController = (cashFlowsService: ICashFlowsService) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const fields = await cashFlowsService.getFields();

      res.status(200).json({
        message: "Fields for cashFlows found",
        data: fields,
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