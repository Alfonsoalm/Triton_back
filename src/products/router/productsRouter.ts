import { Router } from 'express';
import { createController,updateController, getAllController, getByIdController, getFieldsController, deleteController } from '../presentation';
import { productsService } from '../config/config';

const productsRouter = Router();

productsRouter.get("/",getAllController(productsService));

productsRouter.get('/fields', getFieldsController(productsService));

productsRouter.get("/:itemId", getByIdController(productsService));

productsRouter.post("/", createController(productsService));

productsRouter.put("/:itemId", updateController(productsService))

productsRouter.delete("/:itemId", deleteController(productsService))

export { productsRouter };