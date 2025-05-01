import { IIdService } from "../services";

// Contact.ts
export class Item{
    // Requeridos
    private _id: string = '';
    private _name: string = '';
    private _model: string = '';
    private _description?: string;
    private _price?: number;

    private constructor(id: string, name: string, model: string, description?: string, price?: number) {
        this._id = id;
        this._name = name;
        this._model = model;
        this._description = description;
        this._price = price;
    }
    
    public static async createNewItem( idGenerator: IIdService,
        name: string, model: string, description?: string, price?: number
    ): Promise<Item> {
        const id = idGenerator.generate();
        return new Item(id, name, model, description, price);
    }

    public static createExistingItem( 
        id: string, name: string, model: string, description: string, price: number): Item {
        return new Item(id, name, model, description, price);
    }

    public toJSON(): object {
        return {
            id: this._id,
            name: this._name,
            model: this._model,
            description: this._description,
            price: this._price,
        }
    }
}