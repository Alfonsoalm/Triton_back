import { IIdService } from "../services";

export class Product {
  private _id: string = '';
  private _type: string = '';
  private _model: string = '';
  private _brand: string = '';
  private _description?: string;
  private _quantity?: number;
  private _price?: number;
  private _id_supplier?: string;
  private _cost?: number;
  private _tax?: number;
  private _reference?: string;
  private _id_center?: string;

  private constructor(
    id: string,
    type: string,
    model: string,
    brand: string,
    description?: string,
    price?: number,
    quantity?: number,
    id_supplier?: string,
    cost?: number,
    tax?: number,
    reference?: string,
    id_center?: string,
  ) {
    this._id = id;
    this._type = type;
    this._model = model;
    this._brand = brand;
    this._description = description;
    this._price = price;
    this._quantity = quantity;
    this._id_supplier = id_supplier;
    this._cost = cost;
    this._tax = tax;
    this._reference = reference;
    this._id_center = id_center;
  }

  public static async createNewProduct(
    idGenerator: IIdService,
    type: string,
    model: string,
    brand: string,
    description?: string,
    price?: number,
    quantity?: number,
    id_supplier?: string,
    cost?: number,
    tax?: number,
    reference?: string,
    id_center?: string,
  ): Promise<Product> {
    const id = idGenerator.generate();
    return new Product(
      id,
      type,
      model,
      brand,
      description,
      price,
      quantity,
      id_supplier,
      cost,
      tax,
      reference,
      id_center,
    );
  }

  public static createExistingProduct(
    id: string,
    type: string,
    model: string,
    brand: string,
    description?: string,
    price?: number,
    quantity?: number,
    id_supplier?: string,
    cost?: number,
    tax?: number,
    reference?: string,
    id_center?: string,
  ): Product {
    return new Product(
      id,
      type,
      model,
      brand,
      description,
      price,
      quantity,
      id_supplier,
      cost,
      tax,
      reference,
      id_center,
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
      quantity: this._quantity,
      id_supplier: this._id_supplier,
      cost: this._cost,
      tax: this._tax,
      reference: this._reference,
      id_center: this._id_center,
    };
  }
}