import { Request, Response } from "express"
import { IRentsService } from "../domain";

export const updateController = (rentsService: IRentsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { rentId } = req.params;
            const { updates } = req.body;
            console.log("rentId", rentId, "updates", updates)
            const isDeleted = await rentsService.update(rentId, updates);
    
            res.status(200).json({
                message: "Rent updated",
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