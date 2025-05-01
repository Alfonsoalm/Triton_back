// RentDTO.ts
import { RentItem, RentStatus } from "../entities";

export interface RentDTO{
    id: string;
    name: string;
    contactId: string;
    beginDate: Date;
    status: RentStatus;
    rentItems: RentItem[]; // Include the rent items
    endDate?: Date;
    observations?: string;
}
