import { Request, Response } from "express"
import { ICentersService } from "../domain";

export const createController = (centersService: ICentersService) => {
	return async(req: Request, res: Response):Promise<void> => {
		try {
			const centerData = req.body;
			if (!centerData.name || !centerData.mail) {
				throw new Error('Los campos "name" y "mail" son obligatorios.');
			}
			const center = await centersService.create(centerData);
			res.status(200).json({
				message: "Center created successfully.",
				data: center ? center : []
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
