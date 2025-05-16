// itemsRepository.ts
import { sequelize } from "../../../_config/connection"; // Asegúrate de importar la conexión a la BD
import { Item, IItemsRepository } from "../../domain";
import SequelizeItemModel from "../models/SequelizeItemModel";

export class MysqlItemsRepository implements IItemsRepository {
  async getAll(): Promise<Item[]> {
    const itemsData = await SequelizeItemModel.findAll();

    const items = itemsData.map((item) => {
      const {
        id,
        type,
        model,
        brand,
        description,
        price,
        id_supplier,
        cost,
        tax,
        reference,
        id_center,
        quantity,
      } = item.dataValues;
      return Item.createExistingItem(
        id,
        type,
        model,
        brand,
        description,
        price,
        id_supplier,
        cost,
        tax,
        reference,
        id_center,
        quantity
      );
    });
    return items;
  }

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
      price,
      id_supplier,
      cost,
      tax,
      reference,
      id_center,
      quantity,
    } = item.dataValues;
    return Item.createExistingItem(
      itemId,
      type,
      model,
      brand,
      description,
      price,
      id_supplier,
      cost,
      tax,
      reference,
      id_center,
      quantity
    );
  }

  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE items;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  async create(itemN: Item): Promise<Item> {
    const newItem = await SequelizeItemModel.create(itemN.toJSON() as any);
    const itemData = newItem.get();
    const {
      id,
      type,
      model,
      brand,
      description,
      price,
      id_supplier,
      cost,
      tax,
      reference,
      id_center,
      quantity,
    } = itemData;
    return Item.createExistingItem(
      id,
      type,
      model,
      brand,
      description,
      price,
      id_supplier,
      cost,
      tax,
      reference,
      id_center,
      quantity
    );
  }

  async delete(itemId: string): Promise<boolean> {
    await SequelizeItemModel.destroy({ where: { id: itemId } });
    return true;
  }

  async update(itemId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeItemModel.update(updates, {
      where: { id: itemId },
    });
  }
}
