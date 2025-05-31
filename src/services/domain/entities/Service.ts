// Assuming this file is located at: src/features/inventory/domain/service.ts
import { IIdService } from "../services";

export interface Service {
  id: string;
  description: string;
  price: number;
  cost?: number;
  tax?: number;
  reference?: string;
}

export class Service {
  private _id: string;
  private _description: string;
  private _price: number;
  private _cost?: number;
  private _tax?: number;
  private _reference?: string;

  private constructor(
    id: string,
    description: string,
    price: number,
    cost?: number,
    tax?: number,
    reference?: string
  ) {
    this._id = id;
    this._description = description;
    this._price = price;
    this._cost = cost;
    this._tax = tax;
    this._reference = reference;
  }

  // Static factory method for creating a new Service with a generated ID
  public static async createNewService( // Changed from createNewItem to createNewService
    idGenerator: IIdService,
    description: string,
    price: number,
    cost?: number,
    tax?: number,
    reference?: string
  ): Promise<Service> {
    const id = idGenerator.generate();
    return new Service(id, description, price, cost, tax, reference);
  }

  // Static factory method for creating a Service from existing data
  public static createExistingService(
    id: string,
    description: string,
    price: number,
    cost?: number,
    tax?: number,
    reference?: string
  ): Service {
    return new Service(id, description, price, cost, tax, reference);
  }

  // Converts the Service object to a plain JavaScript object (DTO-like)
  public toJSON(): object {
    return {
      id: this._id,
      description: this._description,
      price: this._price,
      cost: this._cost,
      tax: this._tax,
      reference: this._reference,
    };
  }
}

// Data Transfer Object for Service - reflects the structure for API communication
export interface ServiceDTO {
  id: string;
  description: string;
  price: number;
  cost?: number;
  tax?: number;
  reference?: string;
}