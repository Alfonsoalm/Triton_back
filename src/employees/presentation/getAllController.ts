import { Request, Response } from "express"
import { IEmployeesService } from "../domain";

export const getAllController = (employeesService: IEmployeesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const employees = await employeesService.getAll();
            res.status(200).json({
                message: "Employees retrieved successfully.",
                data: employees ? employees.map(e => e.toJSON()) : []
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