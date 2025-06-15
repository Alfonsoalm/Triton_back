// RentDTO.ts
import { RentItem, RentStatus } from "../entities";

export interface RentDTO{
    id: string;
    code: string;
    id_contact: string;

    begin_date: Date;
    end_date: Date;

    status: RentStatus;
    observations: string;

    payment_method: string;
    
    subtotal: number;
    total: number;

    rentItems: RentItem[];
}
