import { Router, Request, Response } from 'express';
import { createController, getAllController, getByTypeController, getByIdController, getFieldsController, deleteController, updateController } from '../presentation';
import { contactsService } from '../config/config';

const contactsRouter = Router();

contactsRouter.get("/",getAllController(contactsService));

contactsRouter.get("/type/:type",getByTypeController(contactsService));

contactsRouter.get('/fields', getFieldsController(contactsService));

// contactsRouter.get("/:contactId", getByIdController(contactsService));

contactsRouter.post("/", createController(contactsService));

contactsRouter.put("/:contactId", updateController(contactsService));

contactsRouter.delete("/:contactId", deleteController(contactsService))

export { contactsRouter };