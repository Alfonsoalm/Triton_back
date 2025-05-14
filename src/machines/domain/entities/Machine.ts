import { IIdService } from "../services";

// Machine.ts
export class Machine{
  // Requeridos
  private _id: string = '';
  private _type: string = ''; // Cambiado _name a _type
  private _model: string = '';
  private _brand?: string; // Añadido _brand
  private _serial_number?: string;
  private _description?: string;
  private _price?: number;
  private _deposit?: number;
  private _available?: boolean;
  private _state?: string;

  private constructor(
    id: string,
    type: string, // Cambiado name a type
    model: string,
    brand?: string, // Añadido brand
    serial_number?: string,
    description?: string,
    price?: number,
    deposit?: number,
    available?: boolean,
    state?: string,
  ) {
    this._id = id;
    this._type = type; // Asignado a _type
    this._model = model;
    this._brand = brand; // Asignado a _brand
    this._serial_number = serial_number;
    this._description = description;
    this._price = price;
    this._deposit = deposit;
    this._available = available;
    this._state = state;
  }

  public static async createNewItem( idGenerator: IIdService,
    type: string, // Cambiado name a type
    model: string,
    brand?: string, // Añadido brand
    serial_number?: string,
    description?: string,
    price?: number,
    deposit?: number,
    available?: boolean,
    state?: string,
  ): Promise<Machine> {
    // Crea nuevo id
    const id = idGenerator.generate();
    // Crea una nueva instancia de Machine
    return new Machine(id, type, model, brand, serial_number, description, price, deposit, available, state);
  }

  public static createExistingItem(
    id: string,
    type: string, // Cambiado name a type
    model: string,
    brand?: string, // Añadido brand
    serial_number?: string,
    description?: string,
    price?: number,
    deposit?: number,
    available?: boolean,
    state?: string
  ): Machine {
    return new Machine(id, type, model, brand, serial_number, description, price, deposit, available, state);
  }

  public toJSON(): object {
    return {
      id: this._id,
      type: this._type, // Usar _type
      model: this._model,
      brand: this._brand, // Usar _brand
      serial_number: this._serial_number,
      description: this._description,
      price: this._price,
      deposit: this._deposit,
      available: this._available,
      state: this._state,
    }
  }
}