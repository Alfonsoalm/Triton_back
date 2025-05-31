import { sequelize } from '../../../_config/connection';
import { Machine, IMachinesRepository} from "../../domain";
import SequelizeMachineModel from '../models/SequelizeMachineModel';

export class MysqlMachinesRepository implements IMachinesRepository{
  async getAll(filters: Record<string, any> = {}): Promise<Machine[]> {
    const machinesData = await SequelizeMachineModel.findAll({ where: filters });

    return machinesData.map(machine => {
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
        status,
        cost,
        id_supplier,
        reference,
        tax,
        id_center,
        id_owner,
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
        status,
        cost,
        id_supplier,
        reference,
        tax,
        id_center,
        id_owner
      );
    });
  }

  async getById(machineId: string): Promise<Machine> {
    const machine = await SequelizeMachineModel.findOne({ where: { id: machineId } });
    if (!machine) {
      throw new Error(`No se encontró una maquina con el id ${machineId}`);
    }
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
      status,
      cost,
      id_supplier,
      reference,
      tax,
      id_center,
      id_owner
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
      status,
      cost,
      id_supplier,
      reference,
      tax,
      id_center,
      id_owner
    );
  }

  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE machines;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  async create(machineN: Machine): Promise<Machine> {
    const newMachine = await SequelizeMachineModel.create(machineN.toJSON() as any);
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
      status,
      cost,
      id_supplier,
      reference,
      tax,
      id_center,
      id_owner
    } = newMachine.get();
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
      status,
      cost,
      id_supplier,
      reference,
      tax,
      id_center,
      id_owner
    );
  }
  async delete(machineId: string): Promise<boolean> {
    const deletedRows = await SequelizeMachineModel.destroy({ where: {id: machineId} });
    return deletedRows > 0;
  }
  async update(machineId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeMachineModel.update(updates, {
      where: {id: machineId},
    });
  }
}