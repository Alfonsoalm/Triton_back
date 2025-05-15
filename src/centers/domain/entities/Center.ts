// Center.ts
import { IIdService } from "../services";

export class Center{
    // Requeridos
    private _id: string = '';
    private _name: string = '';
    private _street: string = '';
    private _location: string = '';
    private _region: string = '';
    private _mail: string = '';
    
    // Opcionales
    private _phone?: string;
    private _photo_url?: string;

    private constructor(
        id: string, name: string, 
        street: string, location: string, 
        region: string, mail: string,
        phone?: string, photo_url?: string) {
        this._id = id;
        this._photo_url = photo_url;
        this._name = name;
        this._street = street;
        this._location = location;
        this._region = region;
        this._mail = mail;
        this._phone = phone;
    }
    
    public static async createNewCenter( idGenerator: IIdService,
        name: string, 
        street: string, location: string, 
        region: string, mail: string,
        phone?: string, photo_url?: string
    ): Promise<Center> {
        const id = idGenerator.generate();
        return new Center(id, name, street, location, region, mail, phone, photo_url);
    }

    public static createExistingCenter( 
        id: string, name: string, 
        street: string, location: string, 
        region: string, mail: string,
        phone?: string, photo_url?: string): Center {
        return new Center(id, name, street, location, region, mail, phone, photo_url);
    }

    public toJSON(): object {
        return {
            id: this._id,
            name: this._name,
            street: this._street,
            location: this._location,
            region: this._region,
            mail: this._mail,
            phone: this._phone,
            photo_url: this._photo_url
        }
    }
}