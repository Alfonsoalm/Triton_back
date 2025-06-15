import { Request, Response } from "express"
import { ICashFlowsService } from "../domain";

export const getAllController = (cashFlowsService: ICashFlowsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const cashFlows = await cashFlowsService.getAll();
            res.status(200).json({
                message: "CashFlows retrieved successfully.",
                data: cashFlows ? cashFlows.map(c => c.toJSON()) : []
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