import { sequelize } from "../../../_config/connection";
import { Employee, IEmployeesRepository, UserRole } from "../../domain";
import { SequelizeEmployeeModel } from "../models";

export class MysqlEmployeesRepository implements IEmployeesRepository{
	/**
 * Obtener todo los empleados de la base de datos.
 * @returns {Promise<Employee[]>} - Devuelve los datos del empleado insertado.
 */
	async getAll(): Promise<Employee[]> {		
		const employeesData = await SequelizeEmployeeModel.findAll();
		const employees = employeesData.map(employee => {
			const { id, name, first_name, dni, mail, phone, role, hire_date, active, photo_url, id_center } = employee.dataValues;
			return Employee.createExistingEmployee(
				id,
				name,
				mail,
				active,
				first_name,
				dni,
				phone,
				role ? role as UserRole: undefined,
				hire_date ? new Date(hire_date) : undefined,
				photo_url,
				id_center
			);
		})
		return employees;
	}
	/**
 * Obtener empleado de un centro determinado.
 * @param {string} centerId - Datos del empleado a insertar.
 * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
 */
	async getByCenter(centerId: string): Promise<Employee[]> {		
		const employeesData = await SequelizeEmployeeModel.findAll(
			{ where: { id_center: centerId } }
		);
				
		const employees = employeesData.map(employee => {
			const { id, name, first_name, dni, mail, phone, role, hire_date, active, photo_url, id_center } = employee.dataValues;
			return Employee.createExistingEmployee(
				id,
				name,
				mail,
				active,
				first_name,
				dni,
				phone,
				role ? role as UserRole: undefined,
				hire_date ? new Date(hire_date) : undefined,
				photo_url,
				id_center
			);
		})
		return employees;
	}
	/**
 * Inserta un nuevo empleado en la base de datos.
 * @param {string} employeeId - Datos del empleado a insertar.
 * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
 */
  async getById(employeeId: string): Promise<Employee> {
    const employee = await SequelizeEmployeeModel.findOne({ where: { id: employeeId } });

    if (!employee) {
			throw new Error(`No se encontró un contacto con el id ${employeeId}`);
    }
    
		const {          
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
		} = employee.dataValues;
		return Employee.createExistingEmployee(
			employeeId,
			name,
			mail,
			active,
			first_name,
			dni,
			phone,
			role,
			hire_date,
			photo_url,
			id_center,
		);
	}
	async getFields(): Promise<unknown[]> {
		const query = `DESCRIBE employees;`;
		const [fields] = await sequelize.query(query);
		return fields;
	}
	async create(employee: Employee): Promise<Employee> {
		const newEmployee = await SequelizeEmployeeModel.create(employee.toJSON());
		const employeeData = newEmployee.get();
		const { 
				id, name, mail, active, first_name, dni, phone, 
				role, hire_date, photo_url, id_center
		} = employeeData;
		return Employee.createExistingEmployee(
				id, name, mail, active, first_name, dni, phone, role, hire_date, photo_url, id_center
		);
	}

			/**
	 * Elimina empleados que coincidan con los filtros proporcionados.
	 * @param {string} employeeId - Objeto con los filtros para la eliminación.
	 * @returns {Promise<void>} - No devuelve nada.
	 */
	async delete(employeeId: string): Promise<boolean> {
		await SequelizeEmployeeModel.destroy({ where: {id: employeeId} });
		return true;
	}
	/**
	 * Actualiza contactos que coincidan con los filtros proporcionados.
	 * @param {Record<string, any>} updates - Datos a actualizar.
	 * @param {string} employeeId - Filtros para identificar los empleados a actualizar.
	 * @returns {Promise<void>} - No devuelve nada.
	 */
	async update(employeeId: string, updates: Record<string, any>): Promise<any> {
		return await SequelizeEmployeeModel.update(updates, {
			where: {id: employeeId},
		});
	}
}