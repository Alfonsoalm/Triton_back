// itemsRepository.ts
import { sequelize } from '../../../_config/connection'; // Asegúrate de importar la conexión a la BD
import { Item, IItemsRepository} from "../../domain";
import SequelizeItemModel from '../models/SequelizeItemModel';

export class MysqlItemsRepository implements IItemsRepository{
  /**
   * Obtiene items con filtros opcionales y aplica un mapeo para procesar los datos.
   * @returns {Promise<Item[]>} - Devuelve una lista de items con los datos procesados.
   */
  async getAll(): Promise<Item[]> {
    const itemsData = await SequelizeItemModel.findAll();

    const items = itemsData.map(item => {
      const {
        id,
        type,
        model,
        brand,
        description,
        price} = item.dataValues;
      return Item.createExistingItem(
        id,
        type,
        model,
        brand,
        description,
        price,
      );
    })
    return items;
  }

    /**
   * Inserta un nuevo item en la base de datos.
   * @param {string} itemId - Datos del item a insertar.
   * @returns {Promise<Item>} - Devuelve los datos del item insertado.
   */
  async getById(itemId: string): Promise<Item> {
    const item = await SequelizeItemModel.findOne({ where: { id: itemId } });
    if (!item) {
      throw new Error(`No se encontró un item con el id ${itemId}`);
    }
    const {
      type,
      model,
      brand, 
      description,
      price
    } = item.dataValues;
    return Item.createExistingItem(
      itemId,
      type,
      model,
      brand,
      description,
      price,
    );
  }

  /**
   * Obtiene los metadatos de la tabla items.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE items;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  /**
   * Inserta un nuevo item en la base de datos.
   * @param {Item} itemN - Datos del item a insertar.
   * @returns {Promise<Item>} - Devuelve los datos del item insertado.
   */
  async create(itemN: Item): Promise<Item> {
    const newItem = await SequelizeItemModel.create(itemN.toJSON() as any);
    const itemData = newItem.get();
    const {
      id,
      type, 
      model,
      brand, 
      description,
      price
    } = itemData;
    return Item.createExistingItem(
      id,
      type,
      model,
      brand,
      description,
      price,
    );
  }
  /**
   * Elimina items que coincidan con los filtros proporcionados.
   * @param {string} itemId - Objeto con los filtros para la eliminación.
   * @returns {Promise<Boolean>} - No devuelve nada.
   */
  async delete(itemId: string): Promise<boolean> {
    await SequelizeItemModel.destroy({ where: {id: itemId} });
    return true;
  }
  /**
   * Actualiza items que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {string} itemId - Filtros para identificar los items a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(itemId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeItemModel.update(updates, {
      where: {id: itemId},
    });
  }
}