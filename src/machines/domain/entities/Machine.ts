import { IIdService } from "../services";

// Contact.ts
export class Machine{
    // Requeridos
    private _id: string = '';
    private _name: string = '';
    private _model: string = '';
    private _serial_number?: string;
    private _description?: string;
    private _price?: number;
    private _deposit?: number;
    private _available?: boolean;
    private _state?: string;

    private constructor(
        id: string, 
        name: string, 
        model: string, 
        serial_number?: string,
        description?: string,
        price?: number,
        deposit?: number,
        available?: boolean,
        state?: string,
    ) {
        this._id = id;
        this._name = name;
        this._model = model;
        this._serial_number = serial_number;
        this._description = description;
        this._price = price;
        this._deposit = deposit;
        this._available = available;
        this._state = state;
    }
    
    public static async createNewItem( idGenerator: IIdService,
        name: string, 
        model: string, 
        serial_number?: string,
        description?: string,
        price?: number,
        deposit?: number,
        available?: boolean,
        state?: string,
    ): Promise<Machine> {
        // Crea nuevo id
        const id = idGenerator.generate();
        // Crea una nueva instancia de Contact
        return new Machine(id, name, model, serial_number, description, price, deposit, available, state);
    }

    public static createExistingItem( 
        id: string, 
        name: string, 
        model: string, 
        serial_number?: string,
        description?: string,
        price?: number,
        deposit?: number,
        available?: boolean,
        state?: string
    ): Machine {
        return new Machine(id, name, model, serial_number, description, price, deposit, available, state);
    }

    public toJSON(): object {
        return {
            id: this._id,
            name: this._name,
            model: this._model,
            serial_number: this._serial_number,
            description: this._description,
            price: this._price,
            deposit: this._deposit,
            available: this._available,
            state: this._state,
        }
    }
}