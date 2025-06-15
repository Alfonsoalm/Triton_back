import { Request, Response } from "express"
import { ICashFlowsService } from "../domain";

export const getByIdController = (cashFlowsService: ICashFlowsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { contactId } = req.params;
            const cashFlow = await cashFlowsService.getById(contactId);
            res.status(200).json({
                message: "CashFlow retrieved successfully.",
                data: cashFlow ? cashFlow: []
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