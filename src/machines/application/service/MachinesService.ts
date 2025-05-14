import { Machine, MachineDTO, IMachinesRepository, IMachinesService, IIdService} from "../../domain";

export class MachinesService implements IMachinesService{

  private readonly _repository: IMachinesRepository;
  private readonly _idService: IIdService;

  constructor(repository: IMachinesRepository, idService: IIdService) {
    this._repository = repository;
    this._idService = idService;
  }

  async getAll(): Promise<Machine[]> {
    const result = await this._repository.getAll();
    return result;
  }

  async getById(machineId: string): Promise<Machine> {
    const result = await this._repository.getById(machineId);
    return result;
  }

  async delete(machineId: string): Promise<boolean> {
    const result = await this._repository.delete(machineId);
    return result;
  }

  async getFields(): Promise<unknown[]> {
    return await this._repository.getFields();
  }

  async create(machineData: Omit<MachineDTO, "id">): Promise<Machine> {

    const {type, model, brand, serial_number, description, price, deposit, available, state} = machineData;
    const newMachine = await Machine.createNewItem(this._idService, type, model, brand, serial_number, description, price, deposit, available, state);

    return await this._repository.create(newMachine);
  }

  async update(machineId: string, updates: any): Promise<Machine> {
    const result = await this._repository.update(machineId, updates);

    return result;
  }
}