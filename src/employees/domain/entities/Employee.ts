import { InvalidEmailFormatError } from "../errors";
import { IIdService } from "../services";

export enum UserRole {
	Admin = "admin",
	Manager = "manager",
	Staff = "staff",
	Intern = "intern",
}

export class Employee{
	//Requeridos
	private _id: string;
	private _name: string;
	private _mail: string;
	private _active: boolean;

	//Opcionales
	private _first_name?: string;
	private _dni?: string;
	private _phone?: string;
	private _role?: UserRole;
	private _hire_date?: Date;
	private _photo_url?: string;
	private _id_center?: string;

	private constructor(
		id: string,
		name: string, 
		mail: string, 
		active: boolean = true, 
		first_name?: string, 
		dni?: string, 
		phone?: string,
		role?: UserRole, 
		hire_date?: Date, 
		photo_url?: string,
		id_center?: string,
	) {
		this._id = id;
		this._name = name;
		this._first_name = first_name;
		this._dni = dni;
		this._mail = mail;
		this._phone = phone;
		this._role = role;
		this._hire_date = hire_date;
		this._active = active;
		this._photo_url = photo_url;
		this._id_center = id_center;
	}

	public static async createNewEmployee(
		idGenerator: IIdService,
		name: string,
		mail: string,
		active:boolean = true,
		first_name?: string,
		dni?: string, 
		phone?: string, 
		role?: UserRole, 
		hire_date?: Date, 
		photo_url?: string,
		id_center?: string,
	): Promise<Employee> {
		//Valida el email
		if (!this.validateEmail(mail)) {
				throw new InvalidEmailFormatError();
		}

		// Crea un nuevo id
		const id = idGenerator.generate();

		// Crear una nueva instancia de Employee
		return new Employee(
			id, 
			name,
			mail,
			active, 
			first_name, 
			dni, 
			phone, 
			role, 
			hire_date, 
			photo_url,
			id_center
		);
	}

	public static createExistingEmployee(
		id: string,
		name: string,
		mail: string, 
		active: boolean = true, 
		first_name?: string, 
		dni?: string, 
		phone?: string, 
		role?: UserRole, 
		hire_date?: Date, 
		photo_url?: string,
		id_center?: string,
	): Employee {
		return new Employee(
			id, 
			name, 
			mail, 
			active, 
			first_name, 
			dni, 
			phone, 
			role, 
			hire_date, 
			photo_url, 
			id_center);
	}

	private static validateEmail(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	public getId(){
		return this._id
	}

	public toJSON(){
		return {
			id: this._id,
			name: this._name,
			mail: this._mail,
			active: this._active,
			first_name: this._first_name,
			dni: this._dni,
			phone: this._phone,
			role: this._role,
			hire_date: this._hire_date ? this._hire_date : undefined,
			photo_url: this._photo_url,
			id_center: this._id_center,
		};
	}
    
}