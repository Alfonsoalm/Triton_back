import { Center } from "../entities";

export interface ICentersRepository {
    getAll(): Promise<Center[]>,
    getFields(): Promise<unknown[]>,
    create(center: Center): Promise<Center>,
    getById(centerId: string): Promise<Center>,
    update(centerId: string, updates: any): Promise<Center>,
    delete(centerId: string): Promise<boolean>,
}