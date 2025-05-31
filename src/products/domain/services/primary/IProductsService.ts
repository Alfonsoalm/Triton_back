import { ProductDTO } from "../../dto";
import { Product } from "../../entities";

export interface IProductsService{
    getAll(): Promise<Product[]>,
    getFields(): Promise<unknown[]>
    create(itemData: Omit<ProductDTO, "id">): Promise<Product>,
    getById(itemId: string): Promise<Product>,
    update(itemId: string, updates: any): Promise<Product>,
    delete(itemId: string): Promise<boolean>
}
