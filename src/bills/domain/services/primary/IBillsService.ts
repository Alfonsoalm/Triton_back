import { BillDTO } from "../../dto";
import { Bill } from "../../entities";

export interface IBillsService {
    getAll(): Promise<Bill[]>,
    getFields(): Promise<unknown[]>
    create(billData: Omit<BillDTO, "id">): Promise<Bill>,
    getById(billId: string): Promise<Bill>,
    update(billId: string, updates: any): Promise<Bill>,
    delete(billId: string): Promise<boolean>
}
