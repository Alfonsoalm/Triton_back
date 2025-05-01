import { Rent } from "../entities";

export interface IRentsRepository{
    getAll(): Promise<Rent[]>,
    getFields(): Promise<unknown[]>,
    create(rent: Rent): Promise<Rent>,
    getById(rentId: string): Promise<Rent>,
    update(rentId: string, updates: any): Promise<Rent>,
    delete(rentId: string): Promise<boolean>,
}