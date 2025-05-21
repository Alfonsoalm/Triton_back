import { CenterDTO } from "../../dto";
import { Center } from "../../entities";

export interface ICentersService {
    getAll(): Promise<Center[]>,
    getFields(): Promise<unknown[]>
    create(centerData: Omit<CenterDTO, "id">): Promise<Center>,
    getById(centerId: string): Promise<Center>,
    update(centerId: string, updates: any): Promise<Center>,
    delete(centerId: string): Promise<boolean>
}
