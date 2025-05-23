import { BillType } from "../entities";

export interface BillDTO{
    id: string;
    bill_code: string;
    bill_type: BillType;
    doc_code: string;
    creation_date: Date;
    deposit: number;
    total: number;
    units: string;
    payment_method: string;
}
