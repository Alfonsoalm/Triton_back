import { ServicesService } from "../application";
import { IServicesRepository, IServicesService, IIdService } from "../domain";
import { MysqlServicesRepository, UUIDService } from "../infrastructure";

const servicesRepository: IServicesRepository = new MysqlServicesRepository();
const idService: IIdService = new UUIDService();

export const servicesService: IServicesService = new ServicesService(servicesRepository, idService);