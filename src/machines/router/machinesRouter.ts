import { Router } from 'express';
import { createController,updateController, getAllController, getByIdController, getFieldsController, deleteController } from '../presentation';
import { machinesService } from '../config/config';

const machinesRouter = Router();

machinesRouter.get("/",getAllController(machinesService));

machinesRouter.get('/fields', getFieldsController(machinesService));

machinesRouter.get("/:machineId", getByIdController(machinesService));

machinesRouter.post("/", createController(machinesService));

machinesRouter.put("/:machineId", updateController(machinesService))

machinesRouter.delete("/:machineId", deleteController(machinesService))

export { machinesRouter };