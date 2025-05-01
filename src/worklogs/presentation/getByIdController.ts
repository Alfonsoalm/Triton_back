import { Request, Response } from "express"
import { IWorklogsService } from "../domain";

export const getByIdController = (worklogsService: IWorklogsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { worklogId } = req.params;
            const worklog = await worklogsService.getById(worklogId);
    
            res.status(200).json({
                message: "Worklog obtained",
                data: worklog
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