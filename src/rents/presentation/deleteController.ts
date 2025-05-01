import { Request, Response } from "express"
import { IRentsService } from "../domain";

export const deleteController = (rentsService: IRentsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { rentId } = req.params;
            const isDeleted = await rentsService.delete(rentId);
    
            res.status(200).json({
                message: "Rent obtained",
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