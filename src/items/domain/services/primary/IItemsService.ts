import { ItemDTO } from "../../dto";
import { Item } from "../../entities";

export interface IItemsService{
    getAll(): Promise<Item[]>,
    getFields(): Promise<unknown[]>
    create(itemData: Omit<ItemDTO, "id">): Promise<Item>,
    getById(itemId: string): Promise<Item>,
    update(itemId: string, updates: any): Promise<Item>,
    delete(itemId: string): Promise<boolean>
}
