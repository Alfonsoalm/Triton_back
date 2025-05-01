import { QuoteDTO } from "../../dto";
import { Quote } from "../../entities";

export interface IQuotesService {
    getAll(): Promise<Quote[]>,
    getFields(): Promise<unknown[]>
    create(quoteData: Omit<QuoteDTO, "id">): Promise<Quote>,
    getById(quoteId: string): Promise<Quote>,
    update(quoteId: string, updates: any): Promise<Quote>,
    delete(quoteId: string): Promise<boolean>
}
