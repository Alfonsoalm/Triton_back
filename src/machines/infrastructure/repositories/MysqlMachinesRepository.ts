// machinesRepository.ts
import { sequelize } from '../../../_config/connection'; // Asegúrate de importar la conexión a la BD
import { Machine, IMachinesRepository} from "../../domain";
import SequelizeMachineModel from '../models/SequelizeMachineModel';

export class MysqlMachinesRepository implements IMachinesRepository{
  /**
   * Obtiene máquinas con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {Record<string, any>} filters - Objeto con los filtros para la consulta.
   * @returns {Promise<Machine[]>} - Devuelve una lista de máquinas con los datos procesados.
   */
  async getAll(filters: Record<string, any> = {}): Promise<Machine[]> {
    const machinesData = await SequelizeMachineModel.findAll({ where: filters });

    const machines = machinesData.map(machine => {
      const {
        id,
        type,
        model,
        brand,
        serial_number,
        description,
        price,
        deposit,
        available,
        state,
      } = machine.dataValues;
      return Machine.createExistingItem(
        id,
        type,
        model,
        brand,
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
   * Obtiene una máquina por su ID.
   * @param {string} machineId - ID de la máquina a buscar.
   * @returns {Promise<Machine>} - Devuelve los datos de la máquina encontrada.
   */
  async getById(machineId: string): Promise<Machine> {
    const machine = await SequelizeMachineModel.findOne({ where: { id: machineId } });
    if (!machine) {
      throw new Error(`No se encontró una maquina con el id ${machineId}`);
    }
    const {
      type,
      model,
      brand,
      serial_number,
      description,
      price,
      deposit,
      available,
      state,
    } = machine.dataValues;
    return Machine.createExistingItem(
      machineId,
      type,
      model,
      brand,
      serial_number,
      description,
      price,
      deposit,
      available,
      state,
    );
  }

  /**
   * Obtiene los metadatos de la tabla machines.
   * @returns {Promise<unknown[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE machines;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  /**
   * Crea una nueva máquina en la base de datos.
   * @param {Machine} machineN - Datos de la máquina a crear.
   * @returns {Promise<Machine>} - Devuelve los datos de la máquina creada.
   */
  async create(machineN: Machine): Promise<Machine> {
    const newMachine = await SequelizeMachineModel.create(machineN.toJSON() as any);
    const machineData = newMachine.get();
    const {
      id,
      type,
      model,
      brand,
      serial_number,
      description,
      price,
      deposit,
      available,
      state,
    } = machineData;
    return Machine.createExistingItem(
      id,
      type, // Usar 'type'
      model,
      brand, // Usar 'brand'
      serial_number,
      description,
      price,
      deposit,
      available,
      state,
    );
  }
  /**
   * Elimina una máquina por su ID.
   * @param {string} machineId - ID de la máquina a eliminar.
   * @returns {Promise<boolean>} - Devuelve true si la eliminación fue exitosa.
   */
  async delete(machineId: string): Promise<boolean> {
    const deletedRows = await SequelizeMachineModel.destroy({ where: {id: machineId} });
    return deletedRows > 0;
  }
  /**
   * Actualiza los datos de una máquina.
   * @param {string} machineId - ID de la máquina a actualizar.
   * @param {Record<string, any>} updates - Objeto con los campos a actualizar y sus nuevos valores.
   * @returns {Promise<any>} - Devuelve el resultado de la actualización.
   */
  async update(machineId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeMachineModel.update(updates, {
      where: {id: machineId},
    });
  }
}