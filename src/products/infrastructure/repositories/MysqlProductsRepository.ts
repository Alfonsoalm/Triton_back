// itemsRepository.ts
import { sequelize } from "../../../_config/connection"; // Asegúrate de importar la conexión a la BD
import { Product, IProductsRepository } from "../../domain";
import SequelizeProductModel from "../models/SequelizeProductModel";

export class MysqlProductsRepository implements IProductsRepository {
  async getAll(): Promise<Product[]> {
    const itemsData = await SequelizeProductModel.findAll();
    const items = itemsData.map((productInstance) => {
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
      } = productInstance.dataValues;
      return Product.createExistingProduct(
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

  async getById(itemId: string): Promise<Product> {
    const productInstance = await SequelizeProductModel.findOne({ where: { id: itemId } });
    if (!productInstance) {
      throw new Error(`No se encontró un Product con el id ${itemId}`);
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
    } = productInstance.dataValues;
    return Product.createExistingProduct(
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

  async create(itemN: Product): Promise<Product> {
    const newItem = await SequelizeProductModel.create(itemN.toJSON() as any);
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
    return Product.createExistingProduct(
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
    await SequelizeProductModel.destroy({ where: { id: itemId } });
    return true;
  }

  async update(itemId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeProductModel.update(updates, {
      where: { id: itemId },
    });
  }
}
