// contactsRepository.ts
import { sequelize } from '../../../_config/connection'; // Asegúrate de importar la conexión a la BD
import { Item, IItemsRepository} from "../../domain";
import SequelizeItemModel from '../models/SequelizeItemModel';

export class MysqlItemsRepository implements IItemsRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @returns {Promise<Item[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getAll(): Promise<Item[]> {
    const itemsData = await SequelizeItemModel.findAll();

    const items = itemsData.map(item => {
      const { 
        id, 
        name, 
        model,
        description,
        price} = item.dataValues;
      return Item.createExistingItem(
        id,
        name,
        model,
        description,
        price
      );
    })
    return items;
  }

    /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {string} itemId - Datos del empleado a insertar.
   * @returns {Promise<Item>} - Devuelve los datos del empleado insertado.
   */
  async getById(itemId: string): Promise<Item> {
    console.log("Obteniendo contacto ", itemId);
    const contact = await SequelizeItemModel.findOne({ where: { id: itemId } });
    if (!contact) {
        throw new Error(`No se encontró un contacto con el id ${itemId}`);
    }
    const { 
      name, 
      model,
      description,
      price
    } = contact.dataValues;
    return Item.createExistingItem(
      itemId,
      name,
      model,
      description,
      price
    );
  }

  /**
   * Obtiene los metadatos de la tabla employees.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE items;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {Item} itemN - Datos del empleado a insertar.
   * @returns {Promise<Item>} - Devuelve los datos del empleado insertado.
   */
  async create(itemN: Item): Promise<Item> {
    const newItem = await SequelizeItemModel.create(itemN.toJSON() as any);
    const itemData = newItem.get();
    const {
      id,
      name,
      model,
      description,
      price
    } = itemData;
    return Item.createExistingItem(
      id,
      name,
      model,
      description,
      price,
    );
  }
  /**
   * Elimina empleados que coincidan con los filtros proporcionados.
   * @param {string} itemId - Objeto con los filtros para la eliminación.
   * @returns {Promise<Boolean>} - No devuelve nada.
   */
  async delete(itemId: string): Promise<boolean> {
    console.log("Eliminado contacto: ", itemId);
    await SequelizeItemModel.destroy({ where: {id: itemId} });
    return true;
  }
  /**
   * Actualiza contactos que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {string} itemId - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(itemId: string, updates: Record<string, any>): Promise<any> {
    console.log("Actualizando contactos", updates, itemId);
    return await SequelizeItemModel.update(updates, {
      where: {id: itemId},
    });
  }
}

