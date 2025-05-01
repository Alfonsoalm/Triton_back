import { Router } from 'express';
import { createController,updateController, getAllController, getByIdController, getFieldsController, deleteController } from '../presentation';
import { quoteItemService } from '../config/config';

const quoteItemsRouter = Router();

quoteItemsRouter.get("/",getAllController(quoteItemService));

quoteItemsRouter.get('/fields', getFieldsController(quoteItemService));

quoteItemsRouter.get("/:quoteItemId", getByIdController(quoteItemService));

quoteItemsRouter.post("/", createController(quoteItemService));

quoteItemsRouter.put("/:quoteItemId", updateController(quoteItemService))

quoteItemsRouter.delete("/:quoteItemId", deleteController(quoteItemService))

export { quoteItemsRouter };