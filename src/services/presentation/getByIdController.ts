import { Request, Response } from "express"
import { IServicesService } from "../domain";

export const getByIdController = (servicesService: IServicesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { serviceId } = req.params;
            const service = await servicesService.getById(serviceId);
    
            res.status(200).json({
                message: "Service obtained",
                data: service
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