import { Request, Response } from "express"
import { IBillsService } from "../domain";

export const createFromRentController = (billsService: IBillsService) => {
	return async(req: Request, res: Response):Promise<void> => {
		try {
			const billDataFromRent = req.body;
			const bill = await billsService.createBillFromRent(
				billDataFromRent.rentData,
				billDataFromRent.creation_date,
				billDataFromRent.due_date,
				billDataFromRent.deposit);
			res.status(200).json({
				message: "Bill created successfully.",
				data: bill ? bill : []
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
