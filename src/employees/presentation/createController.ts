import { Request, Response } from "express"
import { IEmployeesService } from "../domain";

export const createController = (employeesService: IEmployeesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const employeeData = req.body;
            const employee = await employeesService.create(employeeData);
            res.status(200).json({
                message: "Employee created successfully.",
                data: employee ? employee : []
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