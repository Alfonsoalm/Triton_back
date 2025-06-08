import { IIdService } from "../services";

// Machine.ts
export enum MachineStatus {
  Available = "available",
  Repairing = "repairing",
  Broken = "broken",
  Rented = "rented",
  Sold = "sold",
}

export class Machine {
  private _id: string = "";
  private _type: string = "";
  private _model: string = "";
  private _brand?: string;

  private _serial_number?: string;
  private _reference?: string;
  private _description?: string;

  private _daily_rental_price?: number;
  private _sale_price?: number;
  private _deposit?: number;
  private _cost?: number;
  private _tax?: number;

  private _available?: boolean;
  private _status?: MachineStatus;

  private _id_supplier?: string;
  private _id_center?: string;
  private _id_owner?: string;

  private constructor(
    id: string,
    type: string,
    model: string,
    brand?: string,

    serial_number?: string,
    reference?: string,
    description?: string,

    daily_rental_price?: number,
    sale_price?: number,
    deposit?: number,
    cost?: number,
    tax?: number,

    available?: boolean,
    status?: MachineStatus,

    id_supplier?: string,
    id_center?: string,
    id_owner?: string
  ) {
    this._id = id;
    this._type = type;
    this._model = model;
    this._brand = brand;

    this._serial_number = serial_number;
    this._reference = reference;
    this._description = description;

    this._daily_rental_price = daily_rental_price;
    this._sale_price = sale_price;
    this._deposit = deposit;
    this._cost = cost;
    this._tax = tax;

    this._available = available;
    this._status = status;

    this._id_supplier = id_supplier;
    this._id_center = id_center;
    this._id_owner = id_owner;
  }

  public static async createNewItem(
    idGenerator: IIdService,
    type: string,
    model: string,
    brand?: string,

    serial_number?: string,
    reference?: string,
    description?: string,

    daily_rental_price?: number,
    sale_price?: number,
    cost?: number,
    deposit?: number,
    tax?: number,

    available?: boolean,
    status?: MachineStatus,

    id_supplier?: string,
    id_center?: string,
    id_owner?: string
  ): Promise<Machine> {
    const id = idGenerator.generate();
    return new Machine(
      id,
      type,
      model,
      brand,

      serial_number,
      reference,
      description,

      daily_rental_price,
      sale_price,
      cost,
      deposit,
      tax,

      available,
      status,

      id_supplier,
      id_center,
      id_owner
    );
  }

  public static createExistingItem(
    id: string,
    type: string,
    model: string,
    brand?: string,

    serial_number?: string,
    reference?: string,
    description?: string,

    daily_rental_price?: number,
    sale_price?: number,
    deposit?: number,
    cost?: number,
    tax?: number,

    available?: boolean,
    status?: MachineStatus,

    id_supplier?: string,
    id_owner?: string,
    id_center?: string,
  ): Machine {
    return new Machine(
      id,
      type,
      model,
      brand,

      serial_number,
      reference,
      description,

      daily_rental_price,
      sale_price,
      deposit,
      cost,
      tax,

      available,
      status,

      id_supplier,
      id_center,
      id_owner
    );
  }

  public toJSON(): object {
    return {
      id: this._id,
      type: this._type,
      model: this._model,
      brand: this._brand,

      serial_number: this._serial_number,
      reference: this._reference,
      description: this._description,

      daily_rental_price: this._daily_rental_price,
      sale_price: this._sale_price,
      deposit: this._deposit,
      cost: this._cost,
      tax: this._tax,

      available: this._available,
      status: this._status,

      id_supplier: this._id_supplier,
      id_center: this._id_center,
      id_owner: this._id_owner,
    };
  }

  public get model(): string {
    return this._model;
  }

  public get serial_number(): string {
    return this._serial_number ? this._serial_number : "";
  }

  public get brand(): string {
    return this._brand ? this._brand : "";
  }

  public get sale_price(): number {
    return this._sale_price ? this._sale_price : 0;
  }

  public get daily_rental_price(): number {
    return this._daily_rental_price ? this._daily_rental_price : 0;
  }

  public get tax(): number {
    return this._tax ? this._tax : 0;
  }

  public get cost(): number {
    return this._cost ? this._cost : 0;
  }

  public get reference(): string {
    return this._reference ? this._reference : "";
  }

  public get deposit(): number {
    return this._deposit ? this._deposit : 0;
  }
}
