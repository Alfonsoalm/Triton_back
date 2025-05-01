import { Router } from 'express';
import { createController, getAllController, getByIdController, getFieldsController, deleteController, updateController } from '../presentation';
import { rentsService } from '../config/config';
const rentsRouter = Router();

rentsRouter.get("/",getAllController(rentsService));

rentsRouter.get('/fields', getFieldsController(rentsService));

rentsRouter.get("/:rentId", getByIdController(rentsService));

rentsRouter.post("/", createController(rentsService));

rentsRouter.put("/:rentId", updateController(rentsService));

rentsRouter.delete("/:rentId", deleteController(rentsService))

export { rentsRouter };