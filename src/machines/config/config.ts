import { MachinesService } from "../application";
import { IMachinesRepository, IMachinesService, IIdService } from "../domain";
import { MysqlMachinesRepository, UUIDService } from "../infrastructure";

const machinesRepository: IMachinesRepository = new MysqlMachinesRepository();
const idService: IIdService = new UUIDService();

export const machinesService: IMachinesService = new MachinesService(machinesRepository, idService);