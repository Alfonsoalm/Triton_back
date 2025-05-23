import { Bill, BillDTO, IBillsRepository, IBillsService, IIdService} from "../../domain";

export class BillsService implements IBillsService{

    private readonly _repository: IBillsRepository;
    private readonly _idService: IIdService;

    constructor(repository: IBillsRepository, idService: IIdService) {
        this._repository = repository;
        this._idService = idService;
    }

    async getAll(filters: Record<string, any> = {}): Promise<Bill[]> {
        const result = await this._repository.getAll();
        
        return result;
    }

    async getById(billId: string): Promise<Bill> {
        const result = await this._repository.getById(billId);

        return result;
    }

    async delete(billId: string): Promise<boolean> {
        console.log("Entro en delete", billId);

        const result = await this._repository.delete(billId);

        return result;
    }

    async getFields(): Promise<unknown[]> {

        return await this._repository.getFields();
    }

    async create(billData: Omit<BillDTO, "id">): Promise<Bill> {
        
        const { bill_code,
                bill_type,
                doc_code, 
                creation_date, 
                deposit, 
                total,
                units,
                payment_method } = billData;

        const newBill = await Bill.createNewBill(
            this._idService,
            bill_code,
            bill_type,
            doc_code,
            creation_date,
            deposit,
            total,
            units,
            payment_method)

        return await this._repository.create(newBill);
    }

    async update(billId: string, updates: any): Promise<Bill> {

        console.log("Entro en update", billId, updates);

        const result = await this._repository.update(billId, updates);

        return result;
    }
}