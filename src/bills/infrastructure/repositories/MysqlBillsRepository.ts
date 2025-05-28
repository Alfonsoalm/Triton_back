// contactsRepository.ts
import { sequelize } from '../../../_config/connection';
import { Bill, BillItem, IBillsRepository} from "../../domain";
import SequelizeBillItemModel from '../models/SequelizeBillItemModel';
import SequelizeBillModel from '../models/SequelizeBillModel';

export class MysqlBillsRepository implements IBillsRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {Record<string, any>} filters - Objeto con los filtros para la consulta.
   * @returns {Promise<any[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getAll(): Promise<Bill[]> {
    const billsData = await SequelizeBillModel.findAll();
    const bills = await Promise.all(
      billsData.map( async(bill) => {
        const {
          id,
          bill_ref,
          bill_type,
          doc_ref,
          id_customer,
          creation_date,
          due_date,
          deposit,
          subtotal,
          total,
          monetary_units,
          payment_method,
          payment_status
        } = bill.dataValues;
        const billId = id;
        const billItemsData = await SequelizeBillItemModel.findAll({ where: { "bill_id" : billId}});
        const billItemsArray: BillItem[] = [];
        billItemsData.map( async (billItem) => {
          const {
            id,
            bill_id,
            position,
            description,
            quantity,
            unit_price,
            item_subtotal,
            item_total,
            monetary_units,
          } = billItem.dataValues;
          billItemsArray.push({
            id: id,
            position: position,
            description: description,
            quantity: quantity,
            unit_price: unit_price,
            item_subtotal: item_subtotal,
            item_total: item_total,
            monetary_units: monetary_units,
          })
        })   
        return Bill.createExistingBill(
          billId,
          bill_ref,
          bill_type,
          doc_ref,
          id_customer,
          creation_date,
          due_date,
          deposit,
          payment_method,
          payment_status,
          billItemsArray,
        );
      })
    );
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
        bill_ref,
        bill_type,
        doc_ref,
        id_customer,
        creation_date,
        due_date,
        deposit,
        total,
        payment_method,
        payment_status,
      } = bill.dataValues;
      const billItemsData = await SequelizeBillItemModel.findAll({ where: { "bill_id" : billId}});
      const billItemsArray: BillItem[] = [];
      billItemsData.map( async (billItem) => {
        const {
          id,
          bill_id,
          position,
          description,
          quantity,
          unit_price,
          item_subtotal,
          item_total,
          monetary_units,
        } = billItem.dataValues;
        billItemsArray.push({
          id: id,
          position: position,
          description: description,
          quantity: quantity,
          unit_price: unit_price,
          item_subtotal: item_subtotal,
          item_total: item_total,
          monetary_units: monetary_units,
        })
      }) 
    return Bill.createExistingBill(
          billId,
          bill_ref,
          bill_type,
          doc_ref,
          id_customer,
          creation_date,
          due_date,
          deposit,
          payment_method,
          payment_status,
          billItemsArray,
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
        bill_ref,
        bill_type,
        doc_ref,
        id_customer,
        creation_date,
        due_date,
        deposit,
        payment_method,
        payment_status,
    } = billData;
    const billId = id;
    const billItemsData = await SequelizeBillItemModel.findAll({ where: { "bill_id" : billId}});
    const billItemsArray: BillItem[] = billN.items;

    if (billItemsArray !== undefined)
      billItemsArray.map( async (billItem: BillItem) => {
        const newBillItem = await SequelizeBillItemModel.create({
          'id': billItem.id,
          'bill_id': billId,
          'position': billItem.position,
          'description': billItem.description,
          'quantity': billItem.quantity,
          'unit_price': billItem.unit_price,
          'item_subtotal': billItem.item_subtotal,
          'item_total': billItem.item_total,
          'monetary_units': billItem.monetary_units,
        });
      });

    return Bill.createExistingBill(
          billId,
          bill_ref,
          bill_type,
          doc_ref,
          id_customer,
          creation_date,
          due_date,
          deposit,
          payment_method,
          payment_status,
          billItemsArray,
    );
  }

  /**
   * Elimina empleados que coincidan con los filtros proporcionados.
   * @param {string} billId - Objeto con los filtros para la eliminación.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async delete(billId: string): Promise<boolean> {
    await SequelizeBillModel.destroy({ where: {id: billId} });
    await SequelizeBillItemModel.destroy({ where: {bill_id: billId}});
    return true;
  }
  /**
   * Actualiza contactos que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {string} billId - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(billId: string, updates: Record<string, any>): Promise<any> {
    await SequelizeBillModel.update(updates, {
      where: {id: billId},
    });

    if (updates.billItems) {
      const itemsToUpdate = Array.isArray(updates.billItems) ? updates.billItems : [updates.billItems];
      await Promise.all(
        itemsToUpdate.map(async (billItem: BillItem) => {
          await SequelizeBillItemModel.update(billItem, { where: {id: billItem.id}});
        })
      );
    }
    return true; 
  }
}

