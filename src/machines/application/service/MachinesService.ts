import { Machine, MachineDTO, IMachinesRepository, IMachinesService, IIdService} from "../../domain";

export class MachinesService implements IMachinesService{

    private readonly _repository: IMachinesRepository;
    private readonly _idService: IIdService;

    constructor(repository: IMachinesRepository, idService: IIdService) {
        this._repository = repository;
        this._idService = idService;
    }

    async getAll(filters: Record<string, any> = {}): Promise<Machine[]> {
        const result = await this._repository.getAll();
        return result;
    }

    async getById(contactId: string): Promise<Machine> {
        const result = await this._repository.getById(contactId);
        return result;
    }

    async delete(contactId: string): Promise<boolean> {
        const result = await this._repository.delete(contactId);
        return result;
    }

    async getFields(): Promise<unknown[]> {
        return await this._repository.getFields();
    }

    async create(machineData: Omit<MachineDTO, "id">): Promise<Machine> {

        const {name, model, serial_number, description, price, deposit, available, state} = machineData;
        const newItem = await Machine.createNewItem(this._idService, name, model, serial_number, description, price, deposit, available, state);
    
        return await this._repository.create(newItem);
    }

    async update(machineId: string, updates: any): Promise<Machine> {
        const result = await this._repository.update(machineId, updates);

        return result;
    }
}