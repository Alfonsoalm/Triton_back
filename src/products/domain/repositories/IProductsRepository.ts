import { Product } from "../entities";

export interface IProductsRepository{
    getAll(): Promise<Product[]>,
    getFields(): Promise<unknown[]>,
    create(Product: Product): Promise<Product>,
    getById(itemId: string): Promise<Product>,
    update(itemId: string, updates: any): Promise<Product>,
    delete(itemId: string): Promise<boolean>,
}