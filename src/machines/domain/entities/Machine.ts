import { IIdService } from "../services";

// Machine.ts
export enum MachineStatus {
  Available = 'available',
  Repairing = 'repairing',
  Broken = 'broken',
  Rented = 'rented',
  Sold = 'sold',
}


export class Machine {
  private _id: string = '';
  private _type: string = '';
  private _model: string = '';
  private _brand?: string;
  private _serial_number?: string;
  private _description?: string;
  private _price?: number;
  private _deposit?: number;
  private _available?: boolean;
  private _status?: MachineStatus;
  private _cost?: number;
  private _id_supplier?: string;
  private _reference?: string;
  private _tax?: number;
  private _id_center?: string;
  private _id_owner?: string;

  private constructor(
    id: string,
    type: string,
    model: string,
    brand?: string,
    serial_number?: string,
    description?: string,
    price?: number,
    deposit?: number,
    available?: boolean,
    status?: MachineStatus,
    cost?: number,
    id_supplier?: string,
    reference?: string,
    tax?: number,
    id_center?: string,
    id_owner?: string,
  ) {
    this._id = id;
    this._type = type;
    this._model = model;
    this._brand = brand;
    this._serial_number = serial_number;
    this._description = description;
    this._price = price;
    this._deposit = deposit;
    this._available = available;
    this._status = status;
    this._cost = cost;
    this._id_supplier = id_supplier;
    this._reference = reference;
    this._tax = tax;
    this._id_center = id_center;
    this._id_owner = id_owner;
  }

  public static async createNewItem(
    idGenerator: IIdService,
    type: string,
    model: string,
    brand?: string,
    serial_number?: string,
    description?: string,
    price?: number,
    deposit?: number,
    available?: boolean,
    status?: MachineStatus,
    cost?: number,
    id_supplier?: string,
    reference?: string,
    tax?: number, 
    id_center?: string,
    id_owner?: string,
  ): Promise<Machine> {
    const id = idGenerator.generate();
    return new Machine(id, type, model, brand, serial_number, description, price, deposit, available, status, cost, id_supplier, reference, tax, id_center, id_owner);
  }

  public static createExistingItem(
    id: string,
    type: string,
    model: string,
    brand?: string,
    serial_number?: string,
    description?: string,
    price?: number,
    deposit?: number,
    available?: boolean,
    status?: MachineStatus,
    cost?: number,
    id_supplier?: string,
    reference?: string,
    tax?: number,
    id_center?: string,
    id_owner?: string,
  ): Machine {
    return new Machine(id, type, model, brand, serial_number, description, price, deposit, available, status, cost, id_supplier, reference, tax, id_center, id_owner);
  }

  public toJSON(): object {
    return {
      id: this._id,
      type: this._type,
      model: this._model,
      brand: this._brand,
      serial_number: this._serial_number,
      description: this._description,
      price: this._price,
      deposit: this._deposit,
      available: this._available,
      status: this._status,
      cost: this._cost,
      id_supplier: this._id_supplier,
      reference: this._reference,
      tax: this._tax,
      id_center: this._id_center,
      id_owner: this._id_owner,
    };
  }

  public get model(): string { // Añade este getter
      return this._model;
  }

  public get serial_number(): string { // Añade este getter
      return this._serial_number ? this._serial_number : '';
  }

  public get brand(): string { // Añade este getter
      return this._brand ? this._brand : '';
  }

  public get price(): number { // Añade este getter
      return this._price ? this._price : 0;
  }

}