import { Request, Response } from "express"
import { IBillsService } from "../domain";

export const getByIdController = (billsService: IBillsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { contactId } = req.params;
            const bill = await billsService.getById(contactId);
            res.status(200).json({
                message: "Bill retrieved successfully.",
                data: bill ? bill: []
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