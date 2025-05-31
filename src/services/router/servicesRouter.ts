import { Router } from 'express';
import { createController,updateController, getAllController, getByIdController, getFieldsController, deleteController } from '../presentation';
import { servicesService } from '../config/config';

const servicesRouter = Router();

servicesRouter.get("/",getAllController(servicesService));

servicesRouter.get('/fields', getFieldsController(servicesService));

servicesRouter.get("/:serviceId", getByIdController(servicesService));

servicesRouter.post("/", createController(servicesService));

servicesRouter.put("/:serviceId", updateController(servicesService))

servicesRouter.delete("/:serviceId", deleteController(servicesService))

export { servicesRouter };