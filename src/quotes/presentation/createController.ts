import { Request, Response } from "express";
import { IQuotesService } from "../domain";

export const createController = (quotesService: IQuotesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const data = req.body;
            console.log("data in controller",data);
            const quote = await quotesService.create(data);
            
            res.status(200).json({
                message: "Quote created successfully.",
                data: quote.toJSON()
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
