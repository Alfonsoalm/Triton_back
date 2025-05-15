// contactsRepository.ts
import { sequelize } from '../../../_config/connection';
import { Center, ICentersRepository} from "../../domain";
import SequelizeCenterModel from '../models/SequelizeCenterModel';

export class MysqlCentersRepository implements ICentersRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {Record<string, any>} filters - Objeto con los filtros para la consulta.
   * @returns {Promise<any[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getAll(filters: Record<string, any> = {}): Promise<Center[]> {
    const centersData = await SequelizeCenterModel.findAll({ where: filters });
    const centers = centersData.map(center => {
      const { 
        id,
        photo_url,name,
        street,
        location,
        region,
        mail,
        phone,
        } = center.dataValues;
      return Center.createExistingCenter(
        id,
        photo_url,name,
        street,
        location,
        region,
        mail,
        phone,
        
      );
    })
    return centers;
  }

  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {string} centerId - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async getById(centerId: string): Promise<Center> {
    const center = await SequelizeCenterModel.findOne({ where: { id: centerId } });

    if (!center) {
        throw new Error(`No se encontró un contacto con el id ${centerId}`);
    }
    
    const { 
      id,           
      name,
      street,
      location,
      region,
      mail,
      phone,
      photo_url,} = center.dataValues;
    return Center.createExistingCenter(
      centerId,
      name,
      street,
      location,
      region,
      mail,
      phone,
      photo_url,
    );
  }

  /**
   * Obtiene los metadatos de la tabla employees.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE centers;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {Center} centerN - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async create(centerN: Center): Promise<Center> {
    const newCenter = await SequelizeCenterModel.create(centerN.toJSON() as any);
    const centerData = newCenter.get();
    const {
      id,
      name,
      street,
      location,
      region,
      mail,
      phone,
      photo_url,
    } = centerData;
    return Center.createExistingCenter(
      id,
      name,
      street,
      location,
      region,
      mail,
      phone,
      photo_url,
    );
  }

  /**
   * Elimina empleados que coincidan con los filtros proporcionados.
   * @param {string} centerId - Objeto con los filtros para la eliminación.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async delete(centerId: string): Promise<boolean> {
    await SequelizeCenterModel.destroy({ where: {id: centerId} });
    return true;
  }
  /**
   * Actualiza contactos que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {string} centerId - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(centerId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeCenterModel.update(updates, {
      where: {id: centerId},
    });
  }
}

