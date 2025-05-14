// Contact.ts◘
import { IIdService } from "../services";

export class Item{
    private _id: string = '';
    private _type: string = '';
    private _model: string = '';
    private _brand: string = '';
    private _description?: string;
    private _price?: number;

    private constructor(id: string, type: string, model: string, brand: string, description?: string, price?: number) {
        this._id = id;
        this._type = type;
        this._model = model;
        this._brand = brand;
        this._description = description;
        this._price = price;
    }
    
    public static async createNewItem( idGenerator: IIdService,
        type: string, model: string, brand: string, description?: string, price?: number
    ): Promise<Item> {
        const id = idGenerator.generate();
        return new Item(id, type, model, brand, description, price);
    }

    public static createExistingItem( 
        id: string,  type: string, model: string, brand: string, description?: string, price?: number): Item {
        return new Item(id, type, model, brand, description, price);
    }

    public toJSON(): object {
        return {
            id: this._id,
            type: this._type,
            model: this._model,
            brand: this._brand,
            description: this._description,
            price: this._price,
        }
    }
}