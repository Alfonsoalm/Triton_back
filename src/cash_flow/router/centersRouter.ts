import { Router } from 'express';
import { createController, updateController, getAllController, getByIdController, getFieldsController, deleteController } from './presentation';
import { centersService } from '../config/config';
import { employeesService } from '../../employees';
const centersRouter = Router();

centersRouter.get("/",getAllController(centersService));

centersRouter.get('/fields', getFieldsController(centersService));

centersRouter.get("/:contactId", getByIdController(centersService));

centersRouter.post("/", createController(centersService));

centersRouter.put("/:centerId", updateController(centersService))

centersRouter.delete("/:centerId", deleteController(centersService, employeesService))

export { centersRouter };