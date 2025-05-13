import { Request, Response } from "express"
import { IEmployeesService } from "../domain";

export const updateController = (emmployeesService: IEmployeesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { employeeId } = req.params;
            const { updates } = req.body;
            const isUpdated = await emmployeesService.update(employeeId, updates);
            res.status(200).json({
                message: "Employee updated",
                data: isUpdated
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