import { Quote } from "../entities";

export interface IQuotesRepository{
    getAll(): Promise<Quote[]>,
    getFields(): Promise<unknown[]>,
    create(quote: Quote): Promise<Quote>,
    getById(quoteId: string): Promise<Quote>,
    update(quoteId: string, updates: any): Promise<Quote>,
    delete(quoteId: string): Promise<boolean>,
}