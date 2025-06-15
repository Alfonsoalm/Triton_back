import { CashFlowsService } from "../application";
import { ICashFlowsRepository, ICashFlowsService, IIdService } from "../domain";
import { MysqlCashFlowsRepository, UUIDService } from "../infrastructure";
import { quotesService } from "../../quotes";
import { rentsService } from "../../rents";

const cashFlowsRepository: ICashFlowsRepository = new MysqlCashFlowsRepository();
const idService: IIdService = new UUIDService();

export const cashFlowsService: ICashFlowsService = new CashFlowsService(cashFlowsRepository, idService, quotesService, rentsService, );