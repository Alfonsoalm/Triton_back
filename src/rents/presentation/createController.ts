import { Request, Response } from "express"
import { IRentsService } from "../domain";

export const createController = (rentsService: IRentsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const data = req.body;
            console.log("data in controller",data);
            const rent = await rentsService.create(data);
            
            res.status(200).json({
                message: "Rents created successfully.",
                data: rent.toJSON()
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
