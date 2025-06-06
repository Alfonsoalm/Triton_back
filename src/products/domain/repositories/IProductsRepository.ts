import { Product } from "../entities";

export interface IProductsRepository {
  getAll(): Promise<Product[]>;
  getFields(): Promise<unknown[]>;
  create(productData: Product): Promise<Product>;
  getById(productId: string): Promise<Product>;
  update(productId: string, updates: any): Promise<Product>;
  delete(productId: string): Promise<boolean>;
}
