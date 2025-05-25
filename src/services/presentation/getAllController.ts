import { Request, Response } from "express"
import { IServicesService } from "../domain";

export const getAllController = (servicesService: IServicesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const services = await servicesService.getAll();

            res.status(200).json({
                message: "Services retrieved successfully.",
                data: services? services.map(s => s.toJSON()): []
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