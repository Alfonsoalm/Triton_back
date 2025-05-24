import { BillItem, BillPaymentStatus, BillType } from "../entities";

export interface BillDTO{
    id: string;
    bill_ref: string;
    bill_type: BillType;
    doc_ref: string;
    customer_id: string;
    creation_date: Date;
    due_date: Date;
    deposit: number;
    subtotal: number;
    total: number;
    monetary_units: string;
    payment_method: string;
    payment_status: BillPaymentStatus;
    bill_items: BillItem[];
}
