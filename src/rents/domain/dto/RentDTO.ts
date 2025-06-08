// RentDTO.ts
import { RentItem, RentStatus } from "../entities";

export interface RentDTO{
    id: string;
    name: string;
    id_contact: string;
    begin_date: Date;
    end_date?: Date;
    observations?: string;
    status: RentStatus;
    rentItems: RentItem[];
    payment_method: string;
    subtotal: number;
    total: number;
}
