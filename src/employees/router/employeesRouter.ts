import { Router } from "express"
import { employeesService } from "../config"
import { createController, getAllController, getFieldsController, updateController, deleteController, getByIdController } from "../presentation";

export const employeesRouter = Router({mergeParams: true})

employeesRouter.get("/", getAllController(employeesService));

employeesRouter.get('/fields', getFieldsController(employeesService));

employeesRouter.get("/:employeeId", getByIdController(employeesService));

employeesRouter.post("/", createController(employeesService));

employeesRouter.put("/:employeeId", updateController(employeesService));

employeesRouter.delete("/:employeeId", deleteController(employeesService));

