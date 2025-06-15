import { CashFlow } from "../entities";

export interface ICashFlowsRepository {
    getAll(): Promise<CashFlow[]>,
    getFields(): Promise<unknown[]>,
    create(center: CashFlow): Promise<CashFlow>,
    getById(centerId: string): Promise<CashFlow>,
    update(centerId: string, updates: any): Promise<CashFlow>,
    delete(centerId: string): Promise<boolean>,
}