// contactsRepository.ts
import { sequelize } from '../../../_config/connection'; // Asegúrate de importar la conexión a la BD
import { Machine, IMachinesRepository} from "../../domain";
import SequelizeMachineModel from '../models/SequelizeMachineModel';

export class MysqlMachinesRepository implements IMachinesRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {Record<string, any>} filters - Objeto con los filtros para la consulta.
   * @returns {Promise<any[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getAll(filters: Record<string, any> = {}): Promise<Machine[]> {
    const machinesData = await SequelizeMachineModel.findAll({ where: filters });

    const machines = machinesData.map(machine => {
      const { 
        id, 
        name, 
        model,
        serial_number,
        description,
        price,
        deposit,
        available,
        state,
      } = machine.dataValues;
      return Machine.createExistingItem(
        id,
        name,
        model,
        serial_number,
        description,
        price,
        deposit,
        available,
        state,
      );
    })
    return machines;
  }

    /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {string} machineId - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async getById(machineId: string): Promise<Machine> {
    const contact = await SequelizeMachineModel.findOne({ where: { id: machineId } });
    if (!contact) {
        throw new Error(`No se encontró una maquina con el id ${machineId}`);
    }
    const { 
      name, 
      model,
      serial_number,
      description,
      price,
      deposit,
      available,
      state,
    } = contact.dataValues;
    return Machine.createExistingItem(
      machineId,
      name,
      model,
      serial_number,
      description,
      price,
      deposit,
      available,
      state,
    );
  }

  /**
   * Obtiene los metadatos de la tabla employees.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE machines;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {Machine} machineN - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async create(machineN: Machine): Promise<Machine> {
    const newMachine = await SequelizeMachineModel.create(machineN.toJSON() as any);
    const machineData = newMachine.get();
    const {
      id,
      name,
      model,
      serial_number,
      description,
      price,
      deposit,
      available,
      state,
    } = machineData;
    return Machine.createExistingItem(
      id,
      name,
      model,
      serial_number,
      description,
      price,
      deposit,
      available,
      state,
    );
  }
  /**
   * Elimina empleados que coincidan con los filtros proporcionados.
   * @param {string} machineId - Objeto con los filtros para la eliminación.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async delete(machineId: string): Promise<boolean> {
    await SequelizeMachineModel.destroy({ where: {id: machineId} });
    return true;
  }
  /**
   * Actualiza contactos que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {string} machineId - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(machineId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeMachineModel.update(updates, {
      where: {id: machineId},
    });
  }
}

