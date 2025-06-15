// contactsRepository.ts
import { sequelize } from '../../../_config/connection';
import { CashFlow, ICashFlowsRepository} from "../../domain";
import SequelizeCashFlowModel from '../models/SequelizeCashFlowModel';

export class MysqlCashFlowsRepository implements ICashFlowsRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {Record<string, any>} filters - Objeto con los flujos de caja para la consulta.
   * @returns {Promise<any[]>} - Devuelve una lista de flujos de caja con los datos procesados.
   */
  async getAll(filters: Record<string, any> = {}): Promise<CashFlow[]> {
    const cashFlowsData = await SequelizeCashFlowModel.findAll({ where: filters });
    const cashFlows = cashFlowsData.map(cashFlow => {
      const { 
        id,
        type,
        category,
        amount,
        date,
        description,
        reference_id,
        reference_type,
        center_id} = cashFlow.dataValues;
      return CashFlow.createExistingCashFlow(
        id, 
        type,
        category,
        amount,
        date,
        description,
        reference_id,
        reference_type,
        center_id,
      );
    })
    return cashFlows;
  }

  /**
   * Inserta un nuevo flujo de caja en la base de datos.
   * @param {string} cashFlowId - Datos del flujo de caja a insertar.
   * @returns {Promise<any>} - Devuelve los datos del flujo de caja insertado.
   */
  async getById(cashFlowId: string): Promise<CashFlow> {
    const cashFlow = await SequelizeCashFlowModel.findOne({ where: { id: cashFlowId } });

    if (!cashFlow) {
        throw new Error(`No se encontró un flujo de caja con el id ${cashFlowId}`);
    }
    
    const { 
      id,           
      type,
      category,
      amount,
      date,
      description,
      reference_id,
      reference_type,
      center_id,} = cashFlow.dataValues;
    return CashFlow.createExistingCashFlow(
      id,
      type,
      category,
      amount,
      date,
      description,
      reference_id,
      reference_type,
      center_id,
    );
  }

  /**
   * Obtiene los metadatos de la tabla flujos de caja.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE cash_flows;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  /**
   * Inserta un nuevo flujo de caja en la base de datos.
   * @param {CashFlow} cashFlowN - Datos del flujo de caja a insertar.
   * @returns {Promise<any>} - Devuelve los datos del flujo de caja insertado.
   */
  async create(cashFlowN: CashFlow): Promise<CashFlow> {
    const newCashFlow = await SequelizeCashFlowModel.create(cashFlowN.toJSON() as any);
    const cashFlowData = newCashFlow.get();
    const {
      id,
      type,
      category,
      amount,
      date,
      description,
      reference_id,
      reference_type,
      center_id,
    } = cashFlowData;
    return CashFlow.createExistingCashFlow(
      id,
      type,
      category,
      amount,
      date,
      description,
      reference_id,
      reference_type,
      center_id,
    );
  }

  /**
   * Elimina flujo de caja que coincidan con los filtros proporcionados.
   * @param {string} cashFlowId - Objeto con los filtros para la eliminación.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async delete(cashFlowId: string): Promise<boolean> {
    await SequelizeCashFlowModel.destroy({ where: {id: cashFlowId} });
    return true;
  }
  /**
   * Actualiza flujos de caja que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {string} cashFlowId - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(cashFlowId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeCashFlowModel.update(updates, {
      where: {id: cashFlowId},
    });
  }
}

