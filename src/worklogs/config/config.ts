import { WorklogsService } from "../application";
import { IWorklogsRepository, IWorklogsService, IIdService } from "../domain";
import { MysqlWorklogsRepository, UUIDService } from "../infrastructure";

const worklogsRepository: IWorklogsRepository = new MysqlWorklogsRepository();
const idService: IIdService = new UUIDService();

export const worklogsService: IWorklogsService = new WorklogsService(worklogsRepository, idService);