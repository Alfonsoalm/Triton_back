import { Bill } from "../entities";

export interface IBillsRepository {
    getAll(): Promise<Bill[]>,
    getFields(): Promise<unknown[]>,
    create(center: Bill): Promise<Bill>,
    getById(centerId: string): Promise<Bill>,
    update(centerId: string, updates: any): Promise<Bill>,
    delete(centerId: string): Promise<boolean>,
}