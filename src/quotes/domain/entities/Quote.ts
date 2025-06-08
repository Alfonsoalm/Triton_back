import { IIdService } from "../services";

// Quote.ts
export enum QuoteStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Completed = "finished",
}

export interface QuoteItem {
  id: string;
  position: number;
  type: "product" | "service" | "other";
  item_id?: string;
  quantity: number;
  tax: number;
  price: number;
  description: string;
  total: number;
  subtotal: number;
}

export class Quote {
  private _id: string = "";
  private _name: string = "";
  private _id_contact: string = "";
  private _creation_date: Date;
  private _status: QuoteStatus;
  private _total: number;
  private _subtotal: number;
  private _payment_method?: string;
  private _quote_items: QuoteItem[] = [];

  private static calculateTotals(items: QuoteItem[] = []): {
    subtotal: number;
    total: number;
  } {
    if (!Array.isArray(items)) {
      console.error("Error: 'items' no es un array válido", items);
      return { subtotal: 0, total: 0 };
    }

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity * (1 + item.tax / 100),
      0
    );

    return { subtotal, total };
  }

  private constructor(
    id: string,
    name: string,
    id_contact: string,
    creation_date: Date,
    status: QuoteStatus,
    total: number,
    subtotal: number,
    quote_items: QuoteItem[],
    payment_method?: string
  ) {
    this._id = id;
    this._name = name;
    this._id_contact = id_contact;
    this._creation_date = creation_date;
    this._status = status;
    this._total = total;
    this._subtotal = subtotal;
    this._payment_method = payment_method;
    this._quote_items = quote_items;
  }

  public static async createNewQuote(
    idGenerator: IIdService,
    name: string,
    id_contact: string,
    creation_date: Date,
    status: QuoteStatus,
    quote_items: QuoteItem[],
    payment_method?: string
  ): Promise<Quote> {
    const id = idGenerator.generate();
    const { subtotal, total } = this.calculateTotals(quote_items);
    return new Quote(
      id,
      name,
      id_contact,
      creation_date,
      status,
      total,
      subtotal,
      quote_items,
      payment_method
    );
  }

  public static createExistingQuote(
    id: string,
    name: string,
    id_contact: string,
    creation_date: Date,
    status: QuoteStatus,
    quote_items: QuoteItem[],
    payment_method?: string
  ): Quote {
    const { subtotal, total } = this.calculateTotals(quote_items);
    return new Quote(
      id,
      name,
      id_contact,
      creation_date,
      status,
      total,
      subtotal,
      quote_items,
      payment_method
    );
  }

  public toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      id_contact: this._id_contact,
      creation_date: this._creation_date,
      status: this._status,
      total: this._total,
      subtotal: this._subtotal,
      payment_method: this._payment_method,
      quote_items: this._quote_items,
    };
  }

  // --- ¡AÑADE ESTOS GETTERS! ---
  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get id_contact(): string {
    return this._id_contact;
  }

  public get creation_date(): Date {
    return this._creation_date;
  }

  public get status(): QuoteStatus {
    return this._status;
  }

  public get payment_method(): string | undefined {
    return this._payment_method;
  }

  public get quote_items(): QuoteItem[] {
    return this._quote_items;
  }

  public set id_contact(value: string) {
    this._id_contact = value;
  }

  public set creation_date(value: Date) {
    this._creation_date = value;
  }

  public get subtotal(): number {
    return this._subtotal;
  }

  public get total(): number {
    return this._total;
  }
}
