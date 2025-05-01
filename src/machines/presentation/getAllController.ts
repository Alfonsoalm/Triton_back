import { Request, Response } from "express"
import { IMachinesService } from "../domain";

export const getAllController = (machinesService: IMachinesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const machines = await machinesService.getAll();
            res.status(200).json({
                message: "Machines retrieved successfully.",
                data: machines.length !== 0 ? machines.map(m => m.toJSON()) : []
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
    }
}