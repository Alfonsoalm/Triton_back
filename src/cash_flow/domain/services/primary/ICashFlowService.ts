import { CashFlowDTO } from "../../dto";
import { CashFlow } from "../../entities";

export interface ICashFlowsService {
    getAll(): Promise<CashFlow[]>,
    getFields(): Promise<unknown[]>
    payQuote(quote_id: string): Promise<{ payment: CashFlow }>,
    payRent(rent_id: string): Promise<{ payment: CashFlow, depositPayment: CashFlow }>,
    refundRentDeposit(rent_id: string): Promise<{ depositRefund: CashFlow }>,
    getById(cashFlowId: string): Promise<CashFlow>,
    update(cashFlowId: string, updates: any): Promise<CashFlow>,
    delete(cashFlowId: string): Promise<boolean>
}
