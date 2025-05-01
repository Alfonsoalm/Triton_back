import { WorklogDTO } from "../../dto";
import { Worklog } from "../../entities";

export interface IWorklogsService {
    getAll(): Promise<Worklog[]>,
    getFields(): Promise<unknown[]>
    create(worklogData: Omit<WorklogDTO, "id">): Promise<Worklog>,
    getById(worklogId: string): Promise<Worklog>,
    update(worklogId: string, updates: any): Promise<Worklog>,
    delete(worklogId: string): Promise<boolean>
}
