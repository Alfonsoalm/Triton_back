import { IIdService } from "../services";

// Quote.ts
export enum QuoteStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
}

export interface QuoteItem {
    id: string;
    position: number;
    type: string;
    item_id: string;
    quantity: number;
    description: string;
}

export class Quote{
    // Requeridos
    private _id: string = '';
    private _name: string = '';
    private _id_contact: string = '';
    private _creation_date: Date;
    private _status: QuoteStatus;

    // Opcionales
    private _payment_method?: string;

    private _quote_items: QuoteItem[] = [];

    private constructor(
        id: string,
        name: string, 
        id_contact: string, 
        creation_date: Date, 
        status: QuoteStatus,
        items: QuoteItem[],
        payment_method?: string,
    ) {
        this._id = id;
        this._name = name;
        this._id_contact = id_contact;
        this._creation_date = creation_date; 
        this._status = status;
        this._payment_method = payment_method;
        this._quote_items = items;
    }

    public static async createNewQuote( 
        idGenerator: IIdService,
        name: string, 
        id_contact: string, 
        creation_date: Date, 
        status: QuoteStatus,
        items: QuoteItem[],
        payment_method?: string,
    ): Promise<Quote> {
        const id = idGenerator.generate();
        return new Quote(
        id, 
        name, 
        id_contact, 
        creation_date, 
        status,
        items,
        payment_method,
        );
    }

    public static createExistingQuote( 
        id: string, 
        name: string, 
        id_contact: string, 
        creation_date: Date, 
        status: QuoteStatus,
        items: QuoteItem[],
        payment_method: string,
    ): Quote {
        return new Quote(
        id, 
        name, 
        id_contact, 
        creation_date, 
        status,
        items,
        payment_method,
        );
    }

    public toJSON(): object {
        return {
        id: this._id,
        name: this._name,
        id_contact: this._id_contact,
        creation_date: this._creation_date,
        status: this._status,
        quote_items: this._quote_items,
        payment_method: this._payment_method,
        }
    }

    public addItem(item: QuoteItem) {
        this._quote_items.push(item);
    }

    public get items(): QuoteItem[] { // Añade este getter
        return this._quote_items;
    }

    public get id_contact(): string {
        return this._id_contact;
    }

    public set id_contact(value: string) {
        this._id_contact = value;
    }

    public get creation_date(): Date {
        return this._creation_date;
    }

    public set creation_date(value: Date) {
        this._creation_date = value;
    }

}