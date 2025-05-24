import { Request, Response } from "express"
import { IBillsService } from "../domain";

export const deleteController = (billsService: IBillsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { billId } = req.params;

            const isDeleted = await billsService.delete(billId);
            res.status(200).json({
                message: "Bill deleted",
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