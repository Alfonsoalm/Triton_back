import { EmployeesService } from "../application";
import { IEmployeesRepository, IEmployeesService, IIdService } from "../domain";
import { MysqlEmployeesRepository, UUIDService } from "../infrastructure";

const employeesRepository: IEmployeesRepository = new MysqlEmployeesRepository();
const idService: IIdService = new UUIDService();

export const employeesService: IEmployeesService = new EmployeesService(employeesRepository, idService);
