import { Item, ItemDTO, IItemsRepository, IItemsService, IIdService} from "../../domain";

export class ItemsService implements IItemsService{

  private readonly _repository: IItemsRepository;
  private readonly _idService: IIdService;

  constructor(repository: IItemsRepository, idService: IIdService) {
    this._repository = repository;
    this._idService = idService;
  }

  async getAll(): Promise<Item[]> {
    const result = await this._repository.getAll();
    return result;
  }

  async getById(itemId: string): Promise<Item> {
    const result = await this._repository.getById(itemId);
    return result;
  }

  async delete(itemId: string): Promise<boolean> {
    const result = await this._repository.delete(itemId);
    return result;
  }

  async getFields(): Promise<unknown[]> {
    return await this._repository.getFields();
  }

  async create(itemData: Omit<ItemDTO, "id">): Promise<Item> {

    const {type, model, brand, description, price} = itemData;
    const newItem = await Item.createNewItem(this._idService, type, model, brand, description, price);

    return await this._repository.create(newItem);
  }

  async update(itemId: string, updates: any): Promise<Item> {
    const result = await this._repository.update(itemId, updates);

    return result;
  }
}