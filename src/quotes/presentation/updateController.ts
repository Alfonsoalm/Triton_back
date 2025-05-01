import { Request, Response } from "express";
import { IQuotesService } from "../domain";

export const updateController = (quotesService: IQuotesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { quoteId } = req.params;
            const { updates } = req.body;
            console.log("quoteId", quoteId, "updates", updates)
            const isDeleted = await quotesService.update(quoteId, updates);
    
            res.status(200).json({
                message: "Quote updated",
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