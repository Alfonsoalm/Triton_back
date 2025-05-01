import { Request, Response } from "express";
import { IQuotesService } from "../domain";

export const getByIdController = (quotesService: IQuotesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { quoteId } = req.params;
            const quote = await quotesService.getById(quoteId);
    
            res.status(200).json({
                message: "Quote obtained",
                data: quote
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