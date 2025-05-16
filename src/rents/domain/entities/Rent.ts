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

export class Rent {
    // Requeridos
    private _id: string = "";
    private _name: string = "";
    private _id_contact: string = "";
    private _begin_date: Date;
    private _status: RentStatus;

    // Opcionales
    private _end_date?: Date;
    private _observations?: string = "";

    private _items: RentItem[] = [];

    private constructor(
        id: string,
        name: string,
        id_contact: string,
        begin_date: Date,
        status: RentStatus,
        items: RentItem[],
        end_date?: Date,
        observations?: string
    ) {
        this._id = id;
        this._name = name;
        this._id_contact = id_contact;
        this._begin_date = begin_date;
        this._status = status;
        this._end_date = end_date;
        this._observations = observations;
        this._items = items;
    }

    public static async createNewRent(
        idGenerator: IIdService,
        name: string,
        id_contact: string,
        begin_date: Date,
        status: RentStatus,
        items: RentItem[],
        end_date?: Date,
        observations?: string
    ): Promise<Rent> {
        // Crea nuevo id
        const id = idGenerator.generate();
        // Crea una nueva instancia de Rent
        return new Rent(
            id,
            name,
            id_contact,
            begin_date,
            status,
            items,
            end_date,
            observations
        );
    }

    public static createExistingRent(
        id: string,
        name: string,
        id_contact: string,
        begin_date: Date,
        status: RentStatus,
        items: RentItem[],
        end_date?: Date,
        observations?: string
    ): Rent {
        return new Rent(
            id,
            name,
            id_contact,
            begin_date,
            status,
            items,
            end_date,
            observations
        );
    }

    public toJSON(): object {
        return {
            id: this._id,
            name: this._name,
            id_contact: this._id_contact,
            begin_date: this._begin_date,
            status: this._status,
            end_date: this._end_date,
            observations: this._observations,
            items: this._items,
        };
    }

    public addItem(item: RentItem) {
        this._items.push(item);
    }

    public get items(): RentItem[] { // Añade este getter
        return this._items;
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

    public get end_date(): Date | undefined {
        return this._end_date;
    }

    public set end_date(value: Date | undefined) {
        this._end_date = value;
    }
}