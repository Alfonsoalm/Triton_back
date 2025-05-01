import { InvalidConnectionError } from "sequelize";
import { IIdService } from "../services";
import { stat } from "fs";

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
}

export class Rent{

    // Requeridos
    private _id: string = '';
    private _name: string = '';
    private _contactId: string = ''; 
    private _beginDate: Date;
    private _status: RentStatus;

    // Opcionales
    private _endDate?: Date;
    private _observations?: string = '';

    private _items: RentItem[] = [];

    private constructor(id: string, name: string, contactId: string, beginDate: Date,
        status: RentStatus,  items: RentItem[], endDate?: Date, observations?: string) {
            this._id = id;
            this._name = name;
            this._contactId = contactId;
            this._beginDate = beginDate;
            this._status = status;
            this._endDate = endDate;
            this._observations = observations;
            this._items = items;
    }
    
    public static async createNewRent( idGenerator: IIdService,
        name: string, contactId: string, beginDate: Date,
        status: RentStatus, items: RentItem[], endDate?: Date, observations?: string
    ): Promise<Rent> {
        // Crea nuevo id
        const id = idGenerator.generate();
        // Crea una nueva instancia de Rent
        return new Rent(id, name, contactId, beginDate, status, items, endDate, observations);
    }

    public static createExistingRent( 
        id: string, name: string, contactId: string, beginDate: Date,
        status: RentStatus, items: RentItem[], endDate?: Date, observations?: string): Rent {
        
        return new Rent(id, name, contactId, beginDate, status, items, endDate, observations);
            
    }

    public toJSON(): object {
        return {
            id: this._id,
            name: this._name,
            contactId: this._contactId,
            beginDate: this._beginDate,
            status: this._status,
            endDate: this._endDate,
            observations: this._observations,
            items: this._items,
        }
    }

    public addItem(item: RentItem) {
        this._items.push(item);
    }

    public get items(): RentItem[] {
        return this._items;
    }
}