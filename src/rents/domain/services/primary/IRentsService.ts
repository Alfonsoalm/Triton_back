import { RentDTO } from "../../dto";
import { Rent } from "../../entities";

export interface IRentsService{
    getAll(): Promise<Rent[]>,
    getFields(): Promise<unknown[]>
    create(rentData: Omit<RentDTO, "id">): Promise<Rent>,
    getById(rentId: string): Promise<Rent>,
    update(rentId: string, updates: any): Promise<Rent>,
    delete(rentId: string): Promise<boolean>
}
