import { CashFlowReferenceType, CashFlowType } from "../entities";

export interface CashFlowDTO{
    id: string;
    type: CashFlowType;
    amount: number;
    category: string;
    date: Date;
    description?: string;
    reference_id?: string;
    reference_type?: CashFlowReferenceType;
    center_id: string;
}
