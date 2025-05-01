import { Router } from 'express';
import { createController,updateController, getAllController, getByIdController, getFieldsController, deleteController } from '../presentation';
import { quotesService } from '../config/config';

const quotesRouter = Router();

quotesRouter.get("/",getAllController(quotesService));

quotesRouter.get('/fields', getFieldsController(quotesService));

quotesRouter.get("/:quoteId", getByIdController(quotesService));

quotesRouter.post("/", createController(quotesService));

quotesRouter.put("/:quoteId", updateController(quotesService))

quotesRouter.delete("/:quoteId", deleteController(quotesService))

export { quotesRouter };