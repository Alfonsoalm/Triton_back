import { CashFlow } from "../entities";

export interface ICashFlowsRepository {
    getAll(): Promise<CashFlow[]>,
    getFields(): Promise<unknown[]>,
    create(cashFlow: CashFlow): Promise<CashFlow>,
    getById(cashFlowId: string): Promise<CashFlow>,
    update(cashFlowId: string, updates: any): Promise<CashFlow>,
    delete(cashFlowId: string): Promise<boolean>,
}