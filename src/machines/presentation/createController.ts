import { Request, Response } from "express"
import { IMachinesService } from "../domain";

export const createController = (machinesService: IMachinesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const data = req.body;
            console.log("data in controller",data);
            const contact = await machinesService.create(data);
            
            res.status(200).json({
                message: "Machine created successfully.",
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
