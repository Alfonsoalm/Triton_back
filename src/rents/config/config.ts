import { RentsService } from "../application";
import { IRentsRepository, IRentsService, IIdService } from "../domain";
import { MysqlRentsRepository, UUIDService } from "../infrastructure";

const rentsRepository: IRentsRepository = new MysqlRentsRepository();
const idService: IIdService = new UUIDService();

export const rentsService: IRentsService = new RentsService(rentsRepository, idService);
