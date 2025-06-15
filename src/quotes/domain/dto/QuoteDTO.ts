import { QuoteItem, QuoteStatus } from "../entities";

export interface QuoteDTO {
    id: string;
    code: string;
    id_contact: string;
    creation_date: Date;
    status: QuoteStatus;
    quote_items: QuoteItem[];
    total: number;
    subtotal: number;
    payment_method?: string;
}
