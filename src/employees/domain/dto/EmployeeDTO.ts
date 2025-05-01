import { UserRole } from "../entities";

export interface EmployeeDTO{
	id: string;
	name: string;
	mail: string;
	active: boolean;
	first_name?: string;
	dni?: string;
	phone?: string;
	role?: UserRole;
	hire_date?: Date;
	photo_url?: string;
	id_center?: string;
}