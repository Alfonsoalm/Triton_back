import { Request, Response } from "express"
import { IContactsService } from "../domain";

export const getByTypeController = (contactsService: IContactsService) => {
	return async(req: Request, res: Response):Promise<void> => {
		try {
			const { type } = req.params;
			const contacts = await contactsService.getByType(type);
			res.status(200).json({
				message: "Contacts retrieved successfully.",
				data: contacts ? contacts.map(c => c.toJSON()) : []
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