import { Employee } from "../entities";

export interface IEmployeesRepository{
    getAll(): Promise<Employee[]>,
    getByCenter(centerId: string): Promise<Employee[]>,
    getFields(): Promise<unknown[]>,
    create(employee: Employee): Promise<Employee>,
    getById(employeeId: string): Promise<Employee>,
    update(employeeId: string, updates: any): Promise<Employee>,
    delete(employeeId: string): Promise<boolean>,
}