// contactsRepository.ts
import { sequelize } from '../../../_config/connection';
import { Bill, IBillsRepository} from "../../domain";
import SequelizeBillModel from '../models/SequelizeBillModel';

export class MysqlBillsRepository implements IBillsRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {Record<string, any>} filters - Objeto con los filtros para la consulta.
   * @returns {Promise<any[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getAll(filters: Record<string, any> = {}): Promise<Bill[]> {
    const billsData = await SequelizeBillModel.findAll({ where: filters });
    const bills = billsData.map(bill => {
      const { 
        id,
        bill_code,
        bill_type,
        doc_code,
        creation_date,
        deposit,
        total,
        units,
        payment_method,
      } = bill.dataValues;
      return Bill.createExistingBill(
        id,
        bill_code,
        bill_type,
        doc_code,
        creation_date,
        deposit,
        total,
        units,
        payment_method,
      );
    })
    return bills;
  }

  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {string} billId - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async getById(billId: string): Promise<Bill> {
    const bill = await SequelizeBillModel.findOne({ where: { id: billId } });

    if (!bill) {
        throw new Error(`No se encontró un contacto con el id ${billId}`);
    }
    
    const { 
        id,           
        bill_code,
        bill_type,
        doc_code,
        creation_date,
        deposit,
        total,
        units,
        payment_method,
      } = bill.dataValues;
    return Bill.createExistingBill(
      billId,
      bill_code,
      bill_type,
      doc_code,
      creation_date,
      deposit,
      total,
      units,
      payment_method,
    );
  }

  /**
   * Obtiene los metadatos de la tabla employees.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE bills;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {Bill} billN - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async create(billN: Bill): Promise<Bill> {
    const newBill = await SequelizeBillModel.create(billN.toJSON() as any);
    const billData = newBill.get();
    const {
        id,
        bill_code,
        bill_type,
        doc_code,
        creation_date,
        deposit,
        total,
        units,
        payment_method,
    } = billData;
    return Bill.createExistingBill(
        id,
        bill_code,
        bill_type,
        doc_code,
        creation_date,
        deposit,
        total,
        units,
        payment_method,
    );
  }

  /**
   * Elimina empleados que coincidan con los filtros proporcionados.
   * @param {string} billId - Objeto con los filtros para la eliminación.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async delete(billId: string): Promise<boolean> {
    await SequelizeBillModel.destroy({ where: {id: billId} });
    return true;
  }
  /**
   * Actualiza contactos que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {string} billId - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(billId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeBillModel.update(updates, {
      where: {id: billId},
    });
  }
}

