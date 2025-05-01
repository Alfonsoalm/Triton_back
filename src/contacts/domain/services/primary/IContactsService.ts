import { ContactDTO } from "../../dto";
import { Contact } from "../../entities";

export interface IContactsService{
    getAll(): Promise<Contact[]>,
    getFields(): Promise<unknown[]>
    create(contactData: Omit<ContactDTO, "id">): Promise<Contact>,
    getById(contactId: string): Promise<Contact>,
    getByType(type: string): Promise<Contact[]>,
    update(contactId: string, updates: Record<string, any>): Promise<Contact>,
    delete(contactId: string): Promise<boolean>
}
