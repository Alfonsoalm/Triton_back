import { Employee, EmployeeDTO, IEmployeesRepository, IEmployeesService, IIdService } from "../../domain";

export class EmployeesService implements IEmployeesService{

	private readonly _repository: IEmployeesRepository;
	private readonly _idService: IIdService;

	constructor(repository: IEmployeesRepository, idService: IIdService){
		this._repository = repository;
		this._idService = idService;
	}
	
	async getAll(): Promise<Employee[]> {
		return await this._repository.getAll();
	}

	async getById(employeeId: string): Promise<Employee> {
		const result = await this._repository.getById(employeeId);
		return result;
	}

	async getByCenter(centerId: string): Promise<Employee[]> {
		const result = await this._repository.getByCenter(centerId);
		return result;
	}
	
	async getFields(): Promise<unknown[]> {
		return await this._repository.getFields();
	}

	async create(employeeData: Omit<EmployeeDTO, "id">): Promise<Employee> {
		const {name, mail, active, first_name, dni, phone, role, hire_date, photo_url, id_center} = employeeData;
		const newEmployee = await Employee.createNewEmployee(this._idService, name, mail, active, first_name, dni, phone, role, hire_date, photo_url, id_center)
		return await this._repository.create(newEmployee);
	}

	async delete(employeeId: string): Promise<boolean> {
		console.log("Entro en delete", employeeId);
		const result = await this._repository.delete(employeeId);
		return result;
	}

	async update(employeeId: string, updates: any): Promise<Employee> {
		console.log("Entro en update", employeeId, updates);
		const result = await this._repository.update(employeeId, updates);
		return result;
	}
}