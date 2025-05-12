import { Request, Response } from "express"
import { IMachinesService } from "../domain";

export const updateController = (machinesService: IMachinesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { machineId } = req.params;
            const { updates } = req.body;
            console.log("machines/updateController=> machineId", machineId, "updates", updates)
            const isDeleted = await machinesService.update(machineId, updates);
    
            res.status(200).json({
                message: "Machine updated",
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