import { Request, Response } from "express"
import { ICashFlowsService } from "../domain";

export const updateController = (cashFlowsService: ICashFlowsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { cashFlowId } = req.params;
            const { updates } = req.body;
            const isUpdated = await cashFlowsService.update(cashFlowId, updates);
    
            res.status(200).json({
                message: "CashFlow updated",
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