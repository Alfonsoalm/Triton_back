import { Contact } from "../entities";

export interface IContactsRepository{
    getAll(): Promise<Contact[]>,
    getFields(): Promise<unknown[]>,
    create(contact: Contact): Promise<Contact>,
    getById(contactId: string): Promise<Contact>,
    getByType(type: string): Promise<Contact[]>,
    update(contactId: string, updates: any): Promise<Contact>,
    delete(contactId: string): Promise<boolean>,
}