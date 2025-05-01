import { Request, Response } from "express";
import { IQuotesService } from "../domain";

export const getAllController = (quotesService: IQuotesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const quotes = await quotesService.getAll();
    
            res.status(200).json({
                message: "Quotes retrieved successfully.",
                data: quotes? quotes.map(q => q.toJSON()): []
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