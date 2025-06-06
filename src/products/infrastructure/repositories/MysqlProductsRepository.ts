// itemsRepository.ts
import { sequelize } from "../../../_config/connection"; // Asegúrate de importar la conexión a la BD
import { Product, IProductsRepository } from "../../domain";
import SequelizeProductModel from "../models/SequelizeProductModel";

export class MysqlProductsRepository implements IProductsRepository {

  async getAll(): Promise<Product[]> {
    const productsData = await SequelizeProductModel.findAll();
    console.log("############## productsData #################")
    console.log(productsData)
    console.log("############## productsData #################")
    const products = productsData.map((product) => {
      const {
        id,
        type,
        model,
        brand,
        description,
        price,
        quantity,
        id_supplier,
        cost,
        tax,
        reference,
        id_center,
      } = product.dataValues;
      return Product.createExistingProduct(
        id,
        type,
        model,
        brand,
        description,
        price,
        quantity,
        id_supplier,
        cost,
        tax,
        reference,
        id_center,
      );
    });
    return products;
  }

  async getById(productId: string): Promise<Product> {
    const productInstance = await SequelizeProductModel.findOne({
      where: { id: productId },
    });
    if (!productInstance) {
      throw new Error(`No se encontró un Product con el id ${productId}`);
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
      productId,
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
    const query = `DESCRIBE products;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  async create(productN: Product): Promise<Product> {
    const newProduct = await SequelizeProductModel.create(productN.toJSON() as any);
    const productData = newProduct.get();
    const {
      id,
      type,
      model,
      brand,
      description,
      price,
      quantity,
      id_supplier,
      cost,
      tax,
      reference,
      id_center,
    } = productData;
    return Product.createExistingProduct(
      id,
      type,
      model,
      brand,
      description,
      price,
      quantity,
      id_supplier,
      cost,
      tax,
      reference,
      id_center,
    );
  }

  async delete(productId: string): Promise<boolean> {
    await SequelizeProductModel.destroy({ where: { id: productId } });
    return true;
  }

  async update(productId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeProductModel.update(updates, {
      where: { id: productId },
    });
  }
}
