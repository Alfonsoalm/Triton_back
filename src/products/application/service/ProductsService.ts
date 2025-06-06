import {
  Product,
  ProductDTO,
  IProductsRepository,
  IProductsService,
  IIdService,
} from "../../domain";

export class ProductsService implements IProductsService {
  private readonly _repository: IProductsRepository;
  private readonly _idService: IIdService;

  constructor(repository: IProductsRepository, idService: IIdService) {
    this._repository = repository;
    this._idService = idService;
  }

  async getAll(): Promise<Product[]> {
    const result = await this._repository.getAll();
    return result;
  }

  async getById(productId: string): Promise<Product> {
    const result = await this._repository.getById(productId);
    return result;
  }

  async delete(productId: string): Promise<boolean> {
    const result = await this._repository.delete(productId);
    return result;
  }

  async getFields(): Promise<unknown[]> {
    return await this._repository.getFields();
  }

  async create(productData: Omit<ProductDTO, "id">): Promise<Product> {
    const {
      type,
      model,
      brand,
      description,
      price,
      quantity,
    } = productData;
    const newItem = await Product.createNewProduct(
      this._idService,
      type,
      model,
      brand,
      description,
      price,
      quantity,
    );

    return await this._repository.create(newItem);
  }

  async update(productId: string, updates: any): Promise<Product> {
    const result = await this._repository.update(productId, updates);

    return result;
  }
}
