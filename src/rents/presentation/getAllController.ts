import { Request, Response } from "express"
import { IRentsService } from "../domain";

export const getAllController = (rentsService: IRentsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const rents = await rentsService.getAll();
    
            res.status(200).json({
                message: "Rents retrieved successfully.",
                data: rents? rents.map(r => r.toJSON()): []
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