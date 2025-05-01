import { Rent } from '../_models/rents';
import { sequelize } from '../_config/connection';

class RentsRepository {
  /**
   * Obtiene alquileres con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {Record<string, any>} filters - Objeto con los filtros para la consulta.
   * @returns {Promise<any[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  static async get(filters: Record<string, any> = {}): Promise<any[]> {
    console.log("Obteniendo alquileres", filters);
    const rents = await Rent.findAll({ where: filters });
    return rents.map((rent: Record<string, any>) => {
      const rentData = rent.dataValues;
      return rentData;
    });
  }
  /**
 * Obtiene los metadatos de la tabla alquileres.
 * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
 */
  static async getFields(): Promise<any[]> {
    const query = `DESCRIBE rents;`; // Consulta para obtener los campos de la tabla
    const [fields] = await sequelize.query(query);
    console.log("Obteniendo campos",fields);
    return fields;
  }
  /**
   * Inserta un nuevo alquiler en la base de datos.
   * @param {Record<string, any>} newRent - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  static async insert(newRent: Record<string, any>): Promise<any> {
    console.log("Insertando alquiler", newRent);
    const rent = await Rent.create(newRent);
    return rent.dataValues;
  }
  /**
   * Elimina alquileres que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} filters - Objeto con los filtros para la eliminación.
   * @returns {Promise<void>} - No devuelve nada.
   */
  static async delete(filters: Record<string, any>): Promise<void> {
    console.log("Eliminando alquiler", filters);
    await Rent.destroy({ where: filters });
  }
  /**
   * Actualiza alquileres que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {Record<string, any>} filters - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  static async update(updates: Record<string, any>, filters: Record<string, any>): Promise<any> {
    console.log("Actualizando maquina", updates, filters);
    return await Rent.update(updates, {
      where: filters,
    });
  }
}

export { RentsRepository };
