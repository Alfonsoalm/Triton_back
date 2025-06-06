import { ProductDTO } from "../../dto";
import { Product } from "../../entities";

export interface IProductsService {
  getAll(): Promise<Product[]>;
  getFields(): Promise<unknown[]>;
  create(productData: Omit<ProductDTO, "id">): Promise<Product>;
  getById(productId: string): Promise<Product>;
  update(productId: string, updates: any): Promise<Product>;
  delete(productId: string): Promise<boolean>;
}
