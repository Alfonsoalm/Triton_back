import { Request, Response } from "express"
import { ICentersService } from "../domain";
import { IEmployeesService } from "../../employees";

export const deleteController = (centersService: ICentersService, employeesServices: IEmployeesService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { centerId } = req.params;

            const employees = await employeesServices.getByCenter(centerId);
            if (employees.length > 0) {
                await Promise.all(
                    employees.map((employee) => {
                        const id = employee.getId();
                        return employeesServices.update(id, { id_center: null });
                    })
                );
            }

            const isDeleted = await centersService.delete(centerId);
            res.status(200).json({
                message: "Center deleted",
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