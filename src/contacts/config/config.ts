import { ContactsService } from "../application";
import { IContactsRepository, IContactsService, IIdService } from "../domain";
import { MysqlContactsRepository, UUIDService } from "../infrastructure";

const contactsRepository: IContactsRepository = new MysqlContactsRepository();
const idService: IIdService = new UUIDService();

export const contactsService: IContactsService = new ContactsService(contactsRepository, idService);