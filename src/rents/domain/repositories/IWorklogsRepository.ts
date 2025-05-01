import { Worklog } from "../entities";

export interface IWorklogsRepository{
    getAll(): Promise<Worklog[]>,
    getFields(): Promise<unknown[]>,
    create(worklog: Worklog): Promise<Worklog>,
    getById(worklogId: string): Promise<Worklog>,
    update(worklogId: string, updates: any): Promise<Worklog>,
    delete(worklogId: string): Promise<boolean>,
}