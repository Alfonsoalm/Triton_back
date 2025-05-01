import { Router } from 'express';
import { createController,updateController, getAllController, getByIdController, getFieldsController, deleteController } from '../presentation';
import { itemsService } from '../config/config';

const itemsRouter = Router();

itemsRouter.get("/",getAllController(itemsService));

itemsRouter.get('/fields', getFieldsController(itemsService));

itemsRouter.get("/:itemId", getByIdController(itemsService));

itemsRouter.post("/", createController(itemsService));

itemsRouter.put("/:itemId", updateController(itemsService))

itemsRouter.delete("/:itemId", deleteController(itemsService))

export { itemsRouter };