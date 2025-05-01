import { IIdService } from "../services";

// Quote.ts
export class Quote{
    // Requeridos
    private _id: string = '';
    private _name: string = '';
    private _id_contact: string = '';
    private _creation_date: Date;
    private _payment_method: string;
    private _status: string;

    private constructor(
        id: string,
        name: string, 
        id_contact: string, 
        creation_date: Date, 
        payment_method: string,
        status: string,
    ) {
        this._id = id;
        this._name = name;
        this._id_contact = id_contact;
        this._creation_date = creation_date;
        this._payment_method = payment_method;
        this._status = status;
    }

    public static async createNewQuote( 
        idGenerator: IIdService,
        name: string, 
        id_contact: string, 
        creation_date: Date, 
        payment_method: string,
        status: string,
    ): Promise<Quote> {
        const id = idGenerator.generate();
        return new Quote(
        id, 
        name, 
        id_contact, 
        creation_date, 
        payment_method,
        status,
        );
    }

    public static createExistingQuote( 
        id: string, 
        name: string, 
        id_contact: string, 
        creation_date: Date, 
        payment_method: string,
        status: string
    ): Quote {
        return new Quote(
        id, 
        name, 
        id_contact, 
        creation_date, 
        payment_method,
        status,
        );
    }

    public toJSON(): object {
        return {
        id: this._id,
        name: this._name,
        id_contact: this._id_contact,
        creation_date: this._creation_date,
        payment_method: this._payment_method,
        status: this._status,
        }
    }
}