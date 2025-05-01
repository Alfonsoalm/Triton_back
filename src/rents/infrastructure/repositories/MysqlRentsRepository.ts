// rentsRepository.ts
import { openAsBlob } from 'fs';
import { sequelize } from '../../../_config/connection'; // Asegúrate de importar la conexión a la BD
import { Rent, IRentsRepository, RentStatus, RentItem } from "../../domain";
import SequelizeRentModel from '../models/SequelizeRentModel';
import SequelizeRentItemModel from '../models/SequelizeRentItemModel';

export class MysqlRentsRepository implements IRentsRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {Record<string, any>} filters - Objeto con los filtros para la consulta.
   * @returns {Promise<any[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getAll(filters: Record<string, any> = {}): Promise<Rent[]> {
    console.log("Obteniendo alquileres", filters);
    const rentsData = await SequelizeRentModel.findAll({ where: filters });
    
    const rents = await Promise.all(
      rentsData.map( async (rent) => {
        const { id, name, contactId, beginDate, status, endDate, observations } = rent.dataValues;
        const rentId = id;
        const rentItemsData = await SequelizeRentItemModel.findAll({ where: { "rentId" : rentId}});
        const rentItemsArray: RentItem[] = [];
        rentItemsData.map( async (rentItem) => {
            const { id, rentItemId, rentId, itemId, quantity, description } = rentItem.dataValues;
            rentItemsArray.push({id: id, itemId: itemId, quantity: quantity, description: description });
        });
        return Rent.createExistingRent(
            id, name, contactId, beginDate, status, rentItemsArray, endDate, observations, 
        );
      })
    );
    return rents;
  }

  async getById(rentId: string): Promise<Rent> {
    console.log("Obteniendo el alquiler: ", rentId);
    /* Get rent from database */
    const rent = await SequelizeRentModel.findOne({ where: { id: rentId } });
    if (!rent) {
        throw new Error(`No se encontró un alquiler con el id ${rentId}`);
    }
    const { name, contactId, beginDate, status, endDate, observations } = rent.dataValues;
    /* Get rent items from database */
    const rentItemsData = await SequelizeRentItemModel.findAll({ where: { "rentId" : rentId}});
    const rentItemsArray: RentItem[] = [];
    rentItemsData.map( async (rentItem) => {
      const { id, rentItemId, rentId, itemId, quantity, description } = rentItem.dataValues;
      rentItemsArray.push({ id: id, itemId: itemId, quantity: quantity, description: description });
    });

    return Rent.createExistingRent(
          rentId, name, contactId, beginDate, status, rentItemsArray, endDate, observations,
    );
  }

  /**
   * Obtiene los metadatos de la tabla employees.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE rents;`;
    const [fields] = await sequelize.query(query);
    console.log("Obteniendo campos", fields);
    return fields;
  }

  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {Record<string, any>} newRent - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async create(rentN: Rent): Promise<Rent> {
    console.log('json:',rentN.toJSON());
    const rentWithoutItems = rentN.toJSON();
    const newRent = await SequelizeRentModel.create(rentWithoutItems as any);
    console.log("Insertando contrato de alquiler: ", newRent);
    const rentData = newRent.get();
    const {id, name, contactId, beginDate, status, endDate, observations} = rentData;
    const rentId = id;
    /* Create rent item in the database */
    const rentItems: RentItem[] = rentN.items;
    if (rentItems !== undefined)
      rentItems.map( async (rentItem: RentItem) => {
          const newRentItem = await SequelizeRentItemModel.create({ 
              'id': rentItem.id,
              'rentId': rentId,
              'itemId': rentItem.itemId,
              'quantity': rentItem.quantity,
              'description': rentItem.description
            });
      });
    
    return Rent.createExistingRent(
      id, name, contactId, beginDate, status, rentItems, endDate, observations
    );
  }

  /**
   * Elimina empleados que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} filters - Objeto con los filtros para la eliminación.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async delete(rentId: string): Promise<boolean> {
    console.log("Eliminado alquiler : ", rentId);
    await SequelizeRentModel.destroy({ where: {id: rentId} });
    await SequelizeRentItemModel.destroy({ where: {rentId: rentId} });
    return true;
  }
  /**
   * Actualiza alquileres que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {Record<string, any>} filters - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
   async update(rentId: string, updates: Record<string, any>): Promise<any> {
    console.log("Actualizando contactos", rentId, updates);
    await SequelizeRentModel.update(updates, {
      where: { id : rentId },
    });
    updates.rentItems.map( async (rentItem: RentItem) => {
      await SequelizeRentItemModel.update(rentItem, { where: {id: rentItem.id}});
      console.log('rentItem',rentItem);
    })
    return true;
  }
}

