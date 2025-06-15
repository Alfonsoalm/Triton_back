import { Request, Response } from "express"
import { ICashFlowsService } from "../domain";

export const payQuoteController = (cashFlowsService: ICashFlowsService) => {
	return async(req: Request, res: Response):Promise<void> => {
		try {
			const { quoteId } = req.params;
			const cashFlow = await cashFlowsService.payQuote(quoteId);
			res.status(200).json({
				message: "CashFlow created successfully.",
				data: cashFlow ? cashFlow : []
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
