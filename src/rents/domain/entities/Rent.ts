import { IIdService } from "../services";

// Rent.ts
export enum RentStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface RentItem {
  id: string;
  itemId: string;
  quantity: number;
  description: string;
  begin_date: Date;
  end_date: Date;
  daily_rental_price: number;
  sale_price: number;
  tax: number;
  subtotal: number;
  total: number;
}

export class Rent {
  private _id: string = "";
  private _name: string = "";
  private _id_contact: string = "";
  private _begin_date: Date;
  private _end_date: Date;
  private _status: RentStatus;
  private _observations: string = "";
  private _payment_method: string;
  private _subtotal: number;
  private _total: number;
  private _rent_items: RentItem[] = [];

  private static calculateTotals(items: RentItem[] = []): { subtotal: number; total: number } {
    if (!Array.isArray(items)) {
      console.error("Error: 'items' no es un array válido", items);
      return { subtotal: 0, total: 0 };
    }
    const subtotal = items.reduce(
      (sum, item) =>
        // sum +
        // item.daily_rental_price *
        // item.quantity *
        // Math.ceil(
        //   (item.end_date.getTime() - item.begin_date.getTime()) / (1000 * 60 * 60 * 24)),
        sum + item.subtotal,
      0
    );
    const total = items.reduce(
      (sum, item) => sum + item.total,
      0
    );

    return { subtotal, total };
  }

  private constructor(
    id: string,
    name: string,
    id_contact: string,
    begin_date: Date,
    end_date: Date,
    status: RentStatus,
    observations: string,
    payment_method: string,
    subtotal: number,
    total: number,
    items: RentItem[]
  ) {
    this._id = id;
    this._name = name;
    this._id_contact = id_contact;
    this._begin_date = begin_date;
    this._end_date = end_date;
    this._observations = observations;
    this._status = status;
    (this._payment_method = payment_method),
      (this._subtotal = subtotal),
      (this._total = total),
      (this._rent_items = items);
  }

  public static async createNewRent(
    idGenerator: IIdService,
    name: string,
    id_contact: string,
    begin_date: Date,
    end_date: Date,
    status: RentStatus,
    observations: string,
    payment_method: string,
    items: RentItem[]
  ): Promise<Rent> {
    const id = idGenerator.generate();
    const { subtotal, total } = this.calculateTotals(items);
    return new Rent(
      id,
      name,
      id_contact,
      begin_date,
      end_date,
      status,
      observations,
      payment_method,
      subtotal,
      total,
      items
    );
  }

  public static createExistingRent(
    id: string,
    name: string,
    id_contact: string,
    begin_date: Date,
    end_date: Date,
    status: RentStatus,
    observations: string,
    payment_method: string,
    items: RentItem[]
  ): Rent {
    const { subtotal, total } = this.calculateTotals(items);
    return new Rent(
      id,
      name,
      id_contact,
      begin_date,
      end_date,
      status,
      observations,
      payment_method,
      subtotal,
      total,
      items
    );
  }

  public toJSON(): object {
    return {
      id: this._id,
      name: this._name,

      id_contact: this._id_contact,
      begin_date: this._begin_date,
      end_date: this._end_date,

      status: this._status,
      observations: this._observations,

      payment_method: this._payment_method,
      subtotal: this._subtotal,
      total: this._total,

      rentItems: this._rent_items,
    };
  }

  public addItem(item: RentItem) {
    this._rent_items.push(item);
  }

  public get items(): RentItem[] {
    return this._rent_items;
  }

  public get id_contact(): string {
    return this._id_contact;
  }

  public set id_contact(value: string) {
    this._id_contact = value;
  }

  public get begin_date(): Date {
    return this._begin_date;
  }

  public set begin_date(value: Date) {
    this._begin_date = value;
  }

  public get end_date(): Date {
    return this._end_date;
  }

  public set end_date(value: Date) {
    this._end_date = value;
  }

  public get subtotal(): number {
    return this._subtotal;
  }

  public get total(): number {
    return this._total;
  }
}
