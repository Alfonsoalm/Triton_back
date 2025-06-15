import { Quote, QuoteDTO, IQuotesRepository, IQuotesService, IIdService} from "../../domain";

export class QuotesService implements IQuotesService{

    private readonly _repository: IQuotesRepository;
    private readonly _idService: IIdService;

    constructor(repository: IQuotesRepository, idService: IIdService) {
        this._repository = repository;
        this._idService = idService;
    }

    async getAll(): Promise<Quote[]> {
        const result = await this._repository.getAll();
        return result;
    }

    async getById(quoteId: string): Promise<Quote> {
        const result = await this._repository.getById(quoteId);
        return result;
    }

    async delete(quoteId: string): Promise<boolean> {
        const result = await this._repository.delete(quoteId);
        return result;
    }

    async getFields(): Promise<unknown[]> {
        return await this._repository.getFields();
    }

    async create(quoteData: Omit<QuoteDTO, "id">): Promise<Quote> {
        const {
            code,
            id_contact, 
            creation_date, 
            status,
            quote_items,
            payment_method,
        } = quoteData;
        const newQuote = await Quote.createNewQuote(
            this._idService,             
            code,
            id_contact, 
            creation_date, 
            status,
            quote_items,
            payment_method,
        );
    
        return await this._repository.create(newQuote);
    }

    async update(quoteId: string, updates: any): Promise<Quote> {
        const result = await this._repository.update(quoteId, updates);
        return result;
    }
}