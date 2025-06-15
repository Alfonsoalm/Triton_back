import { IQuotesService } from "../../../quotes";
import { IRentsService } from "../../../rents/domain";
import { CashFlow, CashFlowDTO, CashFlowReferenceType, CashFlowType, ICashFlowsRepository, ICashFlowsService, IIdService} from "../../domain";

export class CashFlowsService implements ICashFlowsService{

    private readonly _repository: ICashFlowsRepository;
    private readonly _idService: IIdService;
    private readonly _quotesService: IQuotesService;
    private readonly _rentsService: IRentsService;

    constructor(repository: ICashFlowsRepository, idService: IIdService, quotesService: IQuotesService, rentsService: IRentsService) {
        this._repository = repository;
        this._idService = idService;
        this._quotesService = quotesService;
        this._rentsService = rentsService;
    }

    async getAll(filters: Record<string, any> = {}): Promise<CashFlow[]> {
        const result = await this._repository.getAll();
        
        return result;
    }

    async getById(cashFlowId: string): Promise<CashFlow> {
        const result = await this._repository.getById(cashFlowId);

        return result;
    }

    async delete(cashFlowId: string): Promise<boolean> {
        console.log("Entro en delete", cashFlowId);

        const result = await this._repository.delete(cashFlowId);

        return result;
    }

    async getFields(): Promise<unknown[]> {

        return await this._repository.getFields();
    }

    async payQuote(quote_id: string): Promise<{ payment: CashFlow }> { 

        const quote = await this._quotesService.getById(quote_id);
        if (!quote) throw new Error("Quote not found");
         
        //const {type, category, amount, date, description, reference_id, reference_type, center_id} = cashFlowData;
        const type = CashFlowType.Inflow;
        const category = quote.payment_method ? quote.payment_method : "";
        const amount = quote.total;
        const date = new Date(Date.now());
        const description = ""; // TO DO
        const reference_id = quote_id;
        const reference_type = CashFlowReferenceType.Quote;
        const center_id = ""; // TO DO

        const newPaymentCashFlow = await CashFlow.createNewCashFlow(this._idService, type, category, amount, date, description, reference_id, reference_type, center_id);
        const paymentCashFlow = await this._repository.create(newPaymentCashFlow);
        // TO DO: CHANGE STATUS OF RENT TO ACCEPTED

        return { payment: paymentCashFlow };
    }

    async payRent(rent_id: string): Promise<{ payment: CashFlow, depositPayment: CashFlow }> {

        const rent = await this._rentsService.getById(rent_id);
        if (!rent) throw new Error("Rent not found");
         
        const category = rent.payment_method ? rent.payment_method : "";
        const rentTotal = rent.total;
        const date = new Date(Date.now());
        const description = "Pago de alquiler " + rent.name; 
        const center_id = ""; // TO DO

        const newPaymentCashFlow = await CashFlow.createNewCashFlow(
            this._idService,
            CashFlowType.Inflow,
            category,
            rentTotal,
            date,
            description,
            rent_id,
            CashFlowReferenceType.Rent,
            center_id)
        const paymentCashFlow = await this._repository.create(newPaymentCashFlow);

        const rentDeposit = rent.deposit;
        const depositDescription = "Pago fianza de alquiler " + rent.name; 

        const newDepositPaymentCashFlow = await CashFlow.createNewCashFlow(
            this._idService,
            CashFlowType.Inflow,
            category,
            rentDeposit,
            date,
            depositDescription,
            rent_id,
            CashFlowReferenceType.Rent,
            center_id)
        const depositPaymentCashFlow = await this._repository.create(newDepositPaymentCashFlow);

        // TO DO: CHANGE STATUS OF RENT TO ACCEPTED
        // await this._rentsService.updateStatus(rent_id, "Accepted");

        // const rent_id
        return {
            payment: paymentCashFlow,
            depositPayment: depositPaymentCashFlow,
        };
    }

    async refundRentDeposit(rent_id: string): Promise<{ depositRefund: CashFlow }> {

        const rent = await this._rentsService.getById(rent_id);
        if (!rent) throw new Error("Rent not found");
         
        const category = rent.payment_method ? rent.payment_method : "";
        const date = new Date(Date.now());
        const reference_id = rent_id;
        const center_id = ""; // TO DO
        const rentDeposit = rent.deposit;
        const depositDescription = "Reembolso fianza de alquiler " + rent.name; 

        const newDepositRefundCashFlow = await CashFlow.createNewCashFlow(
            this._idService,
            CashFlowType.Outflow,
            category,
            rentDeposit,
            date,
            depositDescription,
            reference_id,
            CashFlowReferenceType.Rent,
            center_id)
        const depositRefundCashFlow = await this._repository.create(newDepositRefundCashFlow);

        // TO DO: CHANGE STATUS OF RENT TO COMPLETED/FINISHED
        // await this._rentsService.updateStatus(rent_id, "Finished");

        return {
            depositRefund: depositRefundCashFlow,
        };
    }

    async update(cashFlowId: string, updates: any): Promise<CashFlow> {

        console.log("Entro en update", cashFlowId, updates);

        const result = await this._repository.update(cashFlowId, updates);

        return result;
    }
}