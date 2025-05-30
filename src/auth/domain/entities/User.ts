import { InvalidEmailFormatError } from "../errors";
import { IHashService, IIdService } from "../services";


export class User{
    private _id: string;
    private _email: string;
    private _password: string;

    // Constructor privado
    private constructor(id: string, email: string, password: string) {
        this._id = id;
        this._email = email;
        this._password = password;
    }

    // Método estático para crear un usuario nuevo (asincrónico)
    public static async createNewUser(email: string, password: string,  hashService: IHashService, idGenerator: IIdService): Promise<User> {
        if (!this.validateEmail(email)) {
            throw new InvalidEmailFormatError();
        }

        // Hashear la contraseña
        const hashedPassword = await hashService.hash(password);

        // Crear un nuevo id con UUID
        const id = idGenerator.generate();

        // Crear una nueva instancia de User
        return new User(id, email, hashedPassword);
    }

    // Método estático para crear un usuario existente (sin encriptar la contraseña)
    public static createExistingUser(id: string, email: string, password: string): User {
        return new User(id, email, password);
    }

    private static validateEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    public async validatePassword(password: string, hashService: IHashService): Promise<boolean>{
        return hashService.compare(password, this._password);
    }

    get id(): string {
        return this._id;
    }

    private set id(id: string){
        
        if(this._id)
            throw new Error("Id is already assgined");
        
        this._id = id;
    }

    get email(): string{
        return this._email;
    }

    set email(email: string){
        if(!User.validateEmail(email))
            throw new Error("Invalid email"); 
    
        this._email = email;
    }

    public toJSON() {
        return {
            id: this._id,
            email: this._email,
            password: this._password, 
        };
    }
}