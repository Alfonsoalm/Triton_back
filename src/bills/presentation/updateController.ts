import { Request, Response } from "express"
import { IBillsService } from "../domain";

export const updateController = (billsService: IBillsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { billId } = req.params;
            const { updates } = req.body;
            const isUpdated = await billsService.update(billId, updates);
    
            res.status(200).json({
                message: "Bill updated",
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