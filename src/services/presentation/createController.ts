import { Request, Response } from "express"
import { IServicesService } from "../domain";

export const createController = (servicesService: IServicesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const serviceData = req.body;
            const contact = await servicesService.create(serviceData);
            
            res.status(200).json({
                message: "Servicios created successfully.",
                data: contact.toJSON()
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
