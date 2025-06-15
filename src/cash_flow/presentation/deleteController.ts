import { Request, Response } from "express"
import { ICashFlowsService } from "../domain";

export const deleteController = (cashFlowsService: ICashFlowsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { cashFlowId } = req.params;

            const cashFlows = await cashFlowsServices.getByCashFlow(cashFlowId);
            if (cashFlows.length > 0) {
                await Promise.all(
                    cashFlows.map((cashFlow) => {
                        const id = cashFlow.getId();
                        return cashFlowsServices.update(id, { id_cashFlow: null });
                    })
                );
            }

            const isDeleted = await cashFlowsService.delete(cashFlowId);
            res.status(200).json({
                message: "CashFlow deleted",
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