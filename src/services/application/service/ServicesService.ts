import { Service, ServiceDTO, IServicesRepository, IServicesService, IIdService} from "../../domain";

export class ServicesService implements IServicesService{

  private readonly _repository: IServicesRepository;
  private readonly _idService: IIdService;

  constructor(repository: IServicesRepository, idService: IIdService) {
    this._repository = repository;
    this._idService = idService;
  }

  async getAll(): Promise<Service[]> {
    const result = await this._repository.getAll();
    return result;
  }

  async getById(serviceId: string): Promise<Service> {
    const result = await this._repository.getById(serviceId);
    return result;
  }

  async delete(serviceId: string): Promise<boolean> {
    const result = await this._repository.delete(serviceId);
    return result;
  }

  async getFields(): Promise<unknown[]> {
    return await this._repository.getFields();
  }

  async create(serviceData: Omit<ServiceDTO, "id">): Promise<Service> {

    const {
      description, 
      price, 
      cost, 
      tax, 
      reference
    } = serviceData;
    const newItem = await Service.createNewService(
      this._idService,
      description,
      price, 
      cost, 
      tax, 
      reference
    );

    return await this._repository.create(newItem);
  }

  async update(serviceId: string, updates: any): Promise<Service> {
    const result = await this._repository.update(serviceId, updates);

    return result;
  }
}