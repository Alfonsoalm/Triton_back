import { Request, Response } from "express";
import { IMachinesService } from "../domain";

export const createController = (machinesService: IMachinesService) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const machineData = req.body;
      const machine = await machinesService.create(machineData);
      res.status(200).json({
        message: "Machine created successfully.",
        data: machine.toJSON(),
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
