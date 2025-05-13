import { Rent, RentDTO, IRentsRepository, IRentsService, IIdService} from "../../domain";

export class RentsService implements IRentsService{

    private readonly _repository: IRentsRepository;
    private readonly _idService: IIdService;

    constructor(repository: IRentsRepository, idService: IIdService) {
        this._repository = repository;
        this._idService = idService;
    }

    async getAll(filters: Record<string, any> = {}): Promise<Rent[]> {
        const result = await this._repository.getAll();
        return result;
    }

    async getById(rentId: string): Promise<Rent> {
        const result = await this._repository.getById(rentId);
        return result;
    }

    async delete(rentId: string): Promise<boolean> {
        const result = await this._repository.delete(rentId);
        return result;
    }

    async getFields(): Promise<unknown[]> {
        return await this._repository.getFields();
    }

    async create(rentData: Omit<RentDTO, "id">): Promise<Rent> {
        const {name, contactId, beginDate, status, rentItems, endDate, observations} = rentData;
        const newRent = await Rent.createNewRent(
            this._idService, name, contactId, beginDate, status, rentItems, endDate, observations
        )
        return await this._repository.create(newRent);
    }

    async update(rentId: string, updates: any): Promise<Rent> {
        const result = await this._repository.update(rentId, updates);

        return result;
    }
}