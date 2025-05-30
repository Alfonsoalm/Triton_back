import { Request, Response } from "express"
import { IBillsService } from "../domain";

export const getAllController = (billsService: IBillsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const bills = await billsService.getAll();
            res.status(200).json({
                message: "Bills retrieved successfully.",
                data: bills ? bills.map(c => c.toJSON()) : []
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