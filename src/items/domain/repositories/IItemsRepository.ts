import { Item } from "../entities";

export interface IItemsRepository{
    getAll(): Promise<Item[]>,
    getFields(): Promise<unknown[]>,
    create(item: Item): Promise<Item>,
    getById(itemId: string): Promise<Item>,
    update(itemId: string, updates: any): Promise<Item>,
    delete(itemId: string): Promise<boolean>,
}