import { EmployeeDTO } from "../../dto";
import { Employee } from "../../entities";

export interface IEmployeesService{
	getAll(): Promise<Employee[]>,
	getByCenter(centerId: string): Promise<Employee[]>,
	getFields(): Promise<unknown[]>
	create(employeeData: Omit<EmployeeDTO, "id">): Promise<Employee>,
	getById(employeeId: string): Promise<Employee>,
	update(employeeId: string, updates: any): Promise<Employee>,
	delete(employeeId: string): Promise<boolean>,
}