import { ProductsService } from "../application";
import { IProductsRepository, IProductsService, IIdService } from "../domain";
import { MysqlProductsRepository, UUIDService } from "../infrastructure";

const productsRepository: IProductsRepository = new MysqlProductsRepository();
const idService: IIdService = new UUIDService();

export const productsService: IProductsService = new ProductsService(productsRepository, idService);