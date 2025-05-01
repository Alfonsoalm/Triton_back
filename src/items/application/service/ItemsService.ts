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

    async getById(contactId: string): Promise<Item> {
        console.log("Entro en get by id");
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

    async create(itemData: Omit<ItemDTO, "id">): Promise<Item> {

        const {name, model, description, price} = itemData;
        const newItem = await Item.createNewItem(this._idService, name, model, description, price);
    
        return await this._repository.create(newItem);
    }

    async update(itemId: string, updates: any): Promise<Item> {

        console.log("Entro en update", itemId, updates);
        const result = await this._repository.update(itemId, updates);

        return result;
    }
}