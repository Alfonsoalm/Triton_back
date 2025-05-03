import { Request, Response } from "express"
import { ICentersService } from "../domain";

export const getAllController = (centersService: ICentersService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const centers = await centersService.getAll();
            console.log("getAll", centers);
            res.status(200).json({
                message: "Centers retrieved successfully.",
                data: centers ? centers.map(c => c.toJSON()) : []
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