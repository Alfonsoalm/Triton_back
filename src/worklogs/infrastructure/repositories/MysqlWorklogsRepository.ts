// contactsRepository.ts
import { sequelize } from '../../../_config/connection'; // Asegúrate de importar la conexión a la BD
import { Worklog, IWorklogsRepository} from "../../domain";
import SequelizeWorklogModel from '../models/SequelizeWorklogModel';

export class MysqlWorklogsRepository implements IWorklogsRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @returns {Promise<any[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getAll(): Promise<Worklog[]> {

    const worklogsData = await SequelizeWorklogModel.findAll();

    const worklogs = worklogsData.map(worklog => {
      const { 
        id, 
        id_employee, 
        log_datetime, 
        type, 
        observations,
      } = worklog.dataValues;
      return Worklog.createExistingQuote(
        id,
        id_employee, 
        log_datetime, 
        type, 
        observations,
      );
    })
    return worklogs;
  }

    /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {string} worklogId - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async getById(worklogId: string): Promise<Worklog> {
    console.log("Obteniendo contacto ", worklogId);
    const worklog = await SequelizeWorklogModel.findOne({ where: { id: worklogId } });
    if (!worklog) {
        throw new Error(`No se encontró un presupuesto con el id ${worklogId}`);
    }
    const { 
      id_employee, 
      log_datetime, 
      type, 
      observations,
    } = worklog.dataValues;
    return Worklog.createExistingQuote(
      worklogId,
      id_employee, 
      log_datetime, 
      type, 
      observations,
    );
  }
  /**
   * Obtiene los metadatos de la tabla employees.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE worklogs;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }
  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {Worklog} worklogN - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async create(worklogN: Worklog): Promise<Worklog> {
    const newWorklog = await SequelizeWorklogModel.create(worklogN.toJSON() as any);
    const worklogData = newWorklog.get();
    const {
      id,
      id_employee, 
      log_datetime, 
      type, 
      observations,
    } = worklogData;
    return Worklog.createExistingQuote(
      id,
      id_employee, 
      log_datetime, 
      type, 
      observations,
    );
  }
  /**
   * Elimina empleados que coincidan con los filtros proporcionados.
   * @param {string} worklogId - Objeto con los filtros para la eliminación.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async delete(worklogId: string): Promise<boolean> {
    console.log("Eliminado contacto: ", worklogId);
    await SequelizeWorklogModel.destroy({ where: {id: worklogId} });
    return true;
  }
  /**
   * Actualiza contactos que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {string} worklogId - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(worklogId: string, updates: Record<string, any>): Promise<any> {
    console.log("Actualizando contactos", updates, worklogId);
    return await SequelizeWorklogModel.update(updates, {
      where: {id: worklogId},
    });
  }
}

