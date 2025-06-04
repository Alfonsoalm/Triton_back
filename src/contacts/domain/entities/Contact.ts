import { InvalidConnectionError } from "sequelize";
import { InvalidEmailFormatError } from "../errors";
import { IIdService } from "../services";

// Contact.ts
export enum ContactType {
    Customer = "customer",
    Supplier = "supplier",
    Debtor = "debtor",
    Creditor = "creditor",
}

export enum ContactCategory {
    Particular = "particular",
    Professional = "professional",
}

export class Contact{

    // Requeridos
    private _id: string = '';
    private _name: string = '';
    private _firstName: string = '';
    private _type: ContactType = ContactType.Customer; 
    
    // Opcionales
    private _mail?: string;
    private _phone?: string;
    private _nif?: string;
    private _nifUrl?: string;
    private _address?: string;
    private _idAccount?: string;
    private _category?: ContactCategory;
    private _banned?: boolean;

    private constructor(id: string, name: string, first_name: string, type: ContactType, mail?: string,
        phone?: string, nif?: string, nif_url?: string, address?: string, id_account?: string, 
        category?: ContactCategory, access?: boolean) {
            this._id = id;
            this._name = name;
            this._firstName = first_name;
            this._type = type;
            this._mail = mail;
            this._phone = phone;
            this._nif = nif;
            this._nifUrl = nif_url;
            this._address = address;
            this._idAccount = id_account;
            this._category = category;
            this._banned = access;
    }
    
    public static async createNewContact( idGenerator: IIdService,
        name: string, first_name: string, type: ContactType, mail?: string, phone?: string, 
        nif?: string, nif_url?: string, address?: string, id_account?: string, 
        category?: ContactCategory, access?: boolean
    ): Promise<Contact> {
        // Valida el email
        if (mail) {
            if (!this.validateEmail(mail)) {
                throw new InvalidEmailFormatError();
            }
        }
        // Crea nuevo id
        const id = idGenerator.generate();
        // Crea una nueva instancia de Contact
        return new Contact(id, name, first_name, type, mail, phone, nif, nif_url, address, id_account,
            category, access);
    }

    public static createExistingContact( 
        id: string, name: string, first_name: string, type: ContactType, mail?: string, 
        phone?: string, nif?: string, nif_url?: string, address?: string, id_account?: string, 
        category?: ContactCategory, access?: boolean): Contact {
        
        return new Contact(id, name, first_name, type, mail, phone, nif, nif_url, address, id_account,
            category, access);
            
    }

    private static validateEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    public toJSON(): object {
        return {
            id: this._id,
            name: this._name,
            first_name: this._firstName,
            type: this._type,
            mail: this._mail,
            phone: this._phone,
            nif: this._nif,
            nif_url: this._nifUrl,
            address: this._address,
            id_account: this._idAccount,
            category: this._category,
            access: this._banned,
        }
    }
}