import { Router } from 'express';
import { updateController, getAllController, getByIdController, getFieldsController, deleteController, payQuoteController, refundDepositController } from '../presentation';
import { cashFlowsService } from '../config/config';
import { payRentController } from '../presentation/payRentController';
const cashFlowsRouter = Router();

cashFlowsRouter.get("/",getAllController(cashFlowsService));

cashFlowsRouter.get('/fields', getFieldsController(cashFlowsService));

cashFlowsRouter.get("/:contactId", getByIdController(cashFlowsService));

cashFlowsRouter.put("/payRent/:rentId", payRentController(cashFlowsService));

cashFlowsRouter.put("/payQuote/:quoteId", payQuoteController(cashFlowsService));

cashFlowsRouter.put("/refundDeposit/:rentId", refundDepositController(cashFlowsService));

cashFlowsRouter.put("/:cashFlowId", updateController(cashFlowsService));

cashFlowsRouter.delete("/:cashFlowId", deleteController(cashFlowsService));

export { cashFlowsRouter };