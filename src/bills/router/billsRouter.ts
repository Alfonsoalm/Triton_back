import { Router } from 'express';
import { createController, updateController, getAllController, getByIdController, getFieldsController, deleteController, createFromRentController } from '../presentation';
import { billsService } from '../config/config';

const billsRouter = Router();

billsRouter.get("/",getAllController(billsService));

billsRouter.get('/fields', getFieldsController(billsService));

billsRouter.get("/:contactId", getByIdController(billsService));

billsRouter.post("/", createController(billsService));

billsRouter.put("/:billId", updateController(billsService));

billsRouter.delete("/:billId", deleteController(billsService));

billsRouter.post("/fromRents", createFromRentController(billsService));

export { billsRouter };