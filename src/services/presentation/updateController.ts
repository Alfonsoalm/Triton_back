import { Request, Response } from "express"
import { IServicesService } from "../domain";

export const updateController = (servicesService: IServicesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { serviceId } = req.params;
            const { updates } = req.body;
            const isDeleted = await servicesService.update(serviceId, updates);
            res.status(200).json({
                message: "Service updated",
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