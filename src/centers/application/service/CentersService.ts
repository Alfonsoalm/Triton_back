import { Center, CenterDTO, ICentersRepository, ICentersService, IIdService} from "../../domain";

export class CentersService implements ICentersService{

    private readonly _repository: ICentersRepository;
    private readonly _idService: IIdService;

    constructor(repository: ICentersRepository, idService: IIdService) {
        this._repository = repository;
        this._idService = idService;
    }

    async getAll(filters: Record<string, any> = {}): Promise<Center[]> {
        const result = await this._repository.getAll();
        
        return result;
    }

    async getById(centerId: string): Promise<Center> {
        const result = await this._repository.getById(centerId);

        return result;
    }

    async delete(centerId: string): Promise<boolean> {
        console.log("Entro en delete", centerId);

        const result = await this._repository.delete(centerId);

        return result;
    }

    async getFields(): Promise<unknown[]> {

        return await this._repository.getFields();
    }

    async create(centerData: Omit<CenterDTO, "id">): Promise<Center> {
        
        const {name, street, location, region, mail, phone, photo_url} = centerData;

        const newCenter = await Center.createNewCenter(this._idService, name, street, location, region, mail, phone, photo_url)

        return await this._repository.create(newCenter);
    }

    async update(centerId: string, updates: any): Promise<Center> {

        console.log("Entro en update", centerId, updates);

        const result = await this._repository.update(centerId, updates);

        return result;
    }
}