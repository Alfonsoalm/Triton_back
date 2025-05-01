import { QuotesService } from "../application";
import { IQuotesRepository, IQuotesService, IIdService } from "../domain";
import { MysqlQuotesRepository, UUIDService } from "../infrastructure";

const quotesRepository: IQuotesRepository = new MysqlQuotesRepository();
const idService: IIdService = new UUIDService();

export const quotesService: IQuotesService = new QuotesService(quotesRepository, idService);