import { Request, Response } from "express"
import { ICashFlowsService } from "../domain";

export const refundDepositController = (cashFlowsService: ICashFlowsService) => {
	return async(req: Request, res: Response):Promise<void> => {
		try {
			const { rentId } = req.params;
			const payment  = await cashFlowsService.refundRentDeposit(rentId);
			res.status(200).json({
				message: "CashFlows created successfully.",
				data: payment ? payment : [],
		
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
