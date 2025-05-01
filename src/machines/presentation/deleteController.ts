import { Request, Response } from "express"
import { IMachinesService } from "../domain";

export const deleteController = (machinesService: IMachinesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { machineId } = req.params;
            const isDeleted = await machinesService.delete(machineId);
    
            res.status(200).json({
                message: "Item deleted",
                data: isDeleted
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