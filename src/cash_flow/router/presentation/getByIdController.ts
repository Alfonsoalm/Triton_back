import { Request, Response } from "express"
import { ICentersService } from "../../domain";

export const getByIdController = (centersService: ICentersService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { contactId } = req.params;
            const center = await centersService.getById(contactId);
            res.status(200).json({
                message: "Center retrieved successfully.",
                data: center ? center: []
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