import { Product, ProductDTO, IProductsRepository, IProductsService, IIdService} from "../../domain";

export class ProductsService implements IProductsService{

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

  async getById(itemId: string): Promise<Product> {
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

  async create(itemData: Omit<ProductDTO, "id">): Promise<Product> {

    const {type, model, brand, description, price} = itemData;
    const newItem = await Product.createNewProduct(this._idService, type, model, brand, description, price);

    return await this._repository.create(newItem);
  }

  async update(itemId: string, updates: any): Promise<Product> {
    const result = await this._repository.update(itemId, updates);

    return result;
  }
}