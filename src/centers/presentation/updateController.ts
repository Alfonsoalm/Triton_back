import { Request, Response } from "express"
import { ICentersService } from "../domain";

export const updateController = (centersService: ICentersService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { centerId } = req.params;
            const { updates } = req.body;
            const isUpdated = await centersService.update(centerId, updates);
    
            res.status(200).json({
                message: "Center updated",
                data: isUpdated
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