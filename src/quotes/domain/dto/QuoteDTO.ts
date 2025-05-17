import { QuoteItem, QuoteStatus } from "../entities";

export interface QuoteDTO {
    id: string;
    name: string;
    id_contact: string;
    creation_date: Date;
    status: QuoteStatus;
    quote_items: QuoteItem[];
    payment_method?: string;
}
