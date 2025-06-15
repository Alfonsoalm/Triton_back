import { CashFlowDTO } from "../../dto";
import { CashFlow } from "../../entities";

export interface ICashFlowsService {
    getAll(): Promise<CashFlow[]>,
    getFields(): Promise<unknown[]>
    create(cashFlowData: Omit<CashFlowDTO, "id">): Promise<CashFlow>,
    getById(cashFlowId: string): Promise<CashFlow>,
    update(cashFlowId: string, updates: any): Promise<CashFlow>,
    delete(cashFlowId: string): Promise<boolean>
}
