import { Request, Response } from "express"
import { IEmployeesService } from "../domain";

export const deleteController = (employeesService: IEmployeesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { employeeId } = req.params;
            const isDeleted = await employeesService.delete(employeeId);
            res.status(200).json({
                message: "Employee deleted",
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