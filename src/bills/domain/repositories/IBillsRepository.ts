import { Bill } from "../entities";

export interface IBillsRepository {
    getAll(): Promise<Bill[]>,
    getFields(): Promise<unknown[]>,
    create(bill: Bill): Promise<Bill>,
    getById(billId: string): Promise<Bill>,
    update(billId: string, updates: any): Promise<Bill>,
    delete(billId: string): Promise<boolean>,
}