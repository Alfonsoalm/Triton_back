// RentDTO.ts
import { RentItem, RentStatus } from "../entities";

export interface RentDTO{
    id: string;
    name: string;
    id_contact: string;
    begin_date: Date;
    status: RentStatus;
    rentItems: RentItem[]; // Include the rent items
    end_date?: Date;
    observations?: string;
}
