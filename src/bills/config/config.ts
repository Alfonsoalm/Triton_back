import { BillsService } from "../application";
import { IBillsRepository, IBillsService, IIdService } from "../domain";
import { MysqlBillsRepository, UUIDService } from "../infrastructure";

const billsRepository: IBillsRepository = new MysqlBillsRepository();
const idService: IIdService = new UUIDService();

export const billsService: IBillsService = new BillsService(billsRepository, idService);