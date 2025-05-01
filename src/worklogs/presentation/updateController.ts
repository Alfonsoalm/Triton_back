import { Request, Response } from "express"
import { IWorklogsService } from "../domain";

export const updateController = (worklogsService: IWorklogsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { worklogId } = req.params;
            const { updates } = req.body;
            console.log("worklogId", worklogId, "updates", updates)
            const isDeleted = await worklogsService.update(worklogId, updates);
    
            res.status(200).json({
                message: "Worklog updated",
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