import { CentersService } from "../application";
import { ICentersRepository, ICentersService, IIdService } from "../domain";
import { MysqlCentersRepository, UUIDService } from "../infrastructure";

const centersRepository: ICentersRepository = new MysqlCentersRepository();
const idService: IIdService = new UUIDService();

export const centersService: ICentersService = new CentersService(centersRepository, idService);