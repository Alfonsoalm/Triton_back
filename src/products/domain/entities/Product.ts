import { IIdService } from "../services";

export class Product {
  private _id: string = '';
  private _type: string = '';
  private _model: string = '';
  private _brand: string = '';
  private _description?: string;
  private _price?: number;
  private _id_supplier?: string;
  private _cost?: number;
  private _tax?: number;
  private _reference?: string;
  private _id_center?: string;
  private _quantity: number = 0;

  private constructor(
    id: string,
    type: string,
    model: string,
    brand: string,
    description?: string,
    price?: number,
    id_supplier?: string,
    cost?: number,
    tax?: number,
    reference?: string,
    id_center?: string,
    quantity?: number
  ) {
    this._id = id;
    this._type = type;
    this._model = model;
    this._brand = brand;
    this._description = description;
    this._price = price;
    this._id_supplier = id_supplier;
    this._cost = cost;
    this._tax = tax;
    this._reference = reference;
    this._id_center = id_center;
    this._quantity = quantity !== undefined ? quantity : 0;
  }

  public static async createNewProduct(
    idGenerator: IIdService,
    type: string,
    model: string,
    brand: string,
    description?: string,
    price?: number,
    id_supplier?: string,
    cost?: number,
    tax?: number,
    reference?: string,
    id_center?: string,
    quantity: number = 0
  ): Promise<Product> {
    const id = idGenerator.generate();
    return new Product(
      id,
      type,
      model,
      brand,
      description,
      price,
      id_supplier,
      cost,
      tax,
      reference,
      id_center,
      quantity
    );
  }

  public static createExistingProduct(
    id: string,
    type: string,
    model: string,
    brand: string,
    description?: string,
    price?: number,
    id_supplier?: string,
    cost?: number,
    tax?: number,
    reference?: string,
    id_center?: string,
    quantity: number = 0
  ): Product {
    return new Product(
      id,
      type,
      model,
      brand,
      description,
      price,
      id_supplier,
      cost,
      tax,
      reference,
      id_center,
      quantity
    );
  }

  public toJSON(): object {
    return {
      id: this._id,
      type: this._type,
      model: this._model,
      brand: this._brand,
      description: this._description,
      price: this._price,
      id_supplier: this._id_supplier,
      cost: this._cost,
      tax: this._tax,
      reference: this._reference,
      id_center: this._id_center,
      quantity: this._quantity,
    };
  }
}