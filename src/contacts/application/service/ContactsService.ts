import { Contact, ContactDTO, IContactsRepository, IContactsService, IIdService} from "../../domain";

export class ContactsService implements IContactsService{

    private readonly _repository: IContactsRepository;
    private readonly _idService: IIdService;

    constructor(repository: IContactsRepository, idService: IIdService) {
        this._repository = repository;
        this._idService = idService;
    }

    async getAll(): Promise<Contact[]> {
        const result = await this._repository.getAll();
        return result;
    }

    async getByType(type: string): Promise<Contact[]> {
        const result = await this._repository.getByType(type);
        return result;
    }

    async getById(contactId: string): Promise<Contact> {
        const result = await this._repository.getById(contactId);
        return result;
    }

    async delete(contactId: string): Promise<boolean> {
        const result = await this._repository.delete(contactId);
        return result;
    }

    async getFields(): Promise<unknown[]> {
        return await this._repository.getFields();
    }

    async create(contactData: Omit<ContactDTO, "id">): Promise<Contact> {
        const {name, first_name, type, mail, phone, nif, nif_url, address, id_account, category, banned} = contactData;
        const newContact = await Contact.createNewContact(this._idService, name, first_name, type, mail, phone, nif, nif_url, address, id_account, category, banned)
        return await this._repository.create(newContact);
    }

    async update(contactId: string, updates: any): Promise<Contact> {
        const result = await this._repository.update(contactId, updates);
        return result;
    }
}