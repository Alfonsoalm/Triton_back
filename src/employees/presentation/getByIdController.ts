import { Request, Response } from "express"
import { IEmployeesService } from "../domain";

export const getByIdController = (employeesService: IEmployeesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { employeeId } = req.params;
            const employee = await employeesService.getById(employeeId);
            res.status(200).json({
                message: "Employee obtained",
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