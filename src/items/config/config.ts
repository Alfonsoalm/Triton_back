import { ItemsService } from "../application";
import { IItemsRepository, IItemsService, IIdService } from "../domain";
import { MysqlItemsRepository, UUIDService } from "../infrastructure";

const itemsRepository: IItemsRepository = new MysqlItemsRepository();
const idService: IIdService = new UUIDService();

export const itemsService: IItemsService = new ItemsService(itemsRepository, idService);