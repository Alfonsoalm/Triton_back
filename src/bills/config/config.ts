import { IMachinesRepository, MysqlMachinesRepository } from "../../machines";
import { BillsService } from "../application";
import { IBillsRepository, IBillsService, IIdService } from "../domain";
import { IRefService } from "../domain/services/secondary/IRefService";
import { MysqlBillsRepository, RefService, UUIDService } from "../infrastructure";

const billsRepository: IBillsRepository = new MysqlBillsRepository();
const idService: IIdService = new UUIDService();
const refService: IRefService = new RefService();
const machinesRepo: IMachinesRepository = new MysqlMachinesRepository();

export const billsService: IBillsService = new BillsService(billsRepository, idService, refService, machinesRepo);