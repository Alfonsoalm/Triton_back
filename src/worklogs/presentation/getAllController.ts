import { Request, Response } from "express"
import { IWorklogsService } from "../domain";

export const getAllController = (worklogsService: IWorklogsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const worklogs = await worklogsService.getAll();
    
            res.status(200).json({
                message: "Worklogs retrieved successfully.",
                data: worklogs.length !== 0 ? worklogs.map(w => w.toJSON()) : []
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