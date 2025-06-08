// rentsRepository.ts
import { sequelize } from "../../../_config/connection";
import { Rent, IRentsRepository, RentItem } from "../../domain";
import SequelizeRentModel from "../models/SequelizeRentModel";
import SequelizeRentItemModel from "../models/SequelizeRentItemModel";

export class MysqlRentsRepository implements IRentsRepository {
  async getAll(): Promise<Rent[]> {
    const rentsData = await SequelizeRentModel.findAll();
    const rents = await Promise.all(
      rentsData.map(async (rent) => {
        const {
          id,
          name,
          id_contact,

          begin_date,
          end_date,

          status,
          observations,
          payment_method,

          daily_rental_price,
          sale_price,
          tax,

          subtotal,
          total,
        } = rent.dataValues;
        const rentId = id;
        const rentItemsData = await SequelizeRentItemModel.findAll({
          where: { rentId: rentId },
        });
        const rentItemsArray: RentItem[] = rentItemsData.map((rentItem) => {
          const {
            id,
            rentItemId,
            rentId,
            itemId,
            begin_date,
            end_date,
            quantity,
            description,
            subtotal,
            total,
          } = rentItem.dataValues;
          return {
            id: id,
            itemId: itemId,
            begin_date: begin_date,
            end_date: end_date,
            quantity: quantity,
            description: description,
            daily_rental_price: parseFloat(daily_rental_price),
            sale_price: parseFloat(sale_price),
            tax: parseFloat(tax),
            subtotal: parseFloat(subtotal),
            total: parseFloat(total),
          };
        });
        return Rent.createExistingRent(
          rentId,
          name,
          id_contact,

          begin_date,
          end_date,

          status,
          observations,

          payment_method,

          rentItemsArray
        );
      })
    );
    return rents;
  }

  async getById(rentId: string): Promise<Rent> {
    const rent = await SequelizeRentModel.findOne({ where: { id: rentId } });
    if (!rent) {
      throw new Error(`No se encontró un alquiler con el id ${rentId}`);
    }
    const {
      name,
      id_contact,
      begin_date,
      end_date,
      status,
      observations,
      payment_method,
    } = rent.dataValues;
    const rentItemsData = await SequelizeRentItemModel.findAll({
      where: { rentId: rentId },
    });
    const rentItemsArray: RentItem[] = [];
    rentItemsData.map(async (rentItem) => {
      const {
        id,
        rentItemId,
        rentId,
        itemId,
        quantity,
        begin_date,
        end_date,
        description,
        daily_rental_price,
        sale_price,
        tax,
        subtotal,
        total,
      } = rentItem.dataValues;
      rentItemsArray.push({
        id: id,
        itemId: itemId,
        quantity: quantity,
        begin_date: begin_date,
        end_date: end_date,
        description: description,
        daily_rental_price: daily_rental_price,
        sale_price: sale_price,
        tax: tax,
        subtotal: subtotal,
        total: total,
      });
    });

    return Rent.createExistingRent(
      rentId,
      name,
      id_contact,

      begin_date,
      end_date,

      status,
      observations,

      payment_method,

      rentItemsArray
    );
  }

  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE rents;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  async create(rentN: Rent): Promise<Rent> {
    const rentWithoutItems = rentN.toJSON();
    const newRent = await SequelizeRentModel.create(rentWithoutItems as any);
    const rentData = newRent.get();
    const { 
      id, 
      name, 
      id_contact, 
      begin_date, 
      status, 
      end_date,
      observations,
      payment_method, } = rentData;
    const rentId = id;
    const rentItems: RentItem[] = rentN.items;
    if (rentItems !== undefined)
      rentItems.map(async (rentItem: RentItem) => {
        const newRentItem = await SequelizeRentItemModel.create({
          id: rentItem.id,
          rentId: rentId,
          itemId: rentItem.itemId,
          quantity: rentItem.quantity,
          description: rentItem.description,
          begin_date: rentItem.begin_date,
          end_date: rentItem.end_date,
          subtotal: rentItem.subtotal,
          total: rentItem.total,
        });
      });

    return Rent.createExistingRent(
      id,
      name,
      id_contact,

      begin_date,
      end_date,

      status,
      observations,

      payment_method,

      rentItems
    );
  }

  async delete(rentId: string): Promise<boolean> {
    await SequelizeRentModel.destroy({ where: { id: rentId } });
    await SequelizeRentItemModel.destroy({ where: { rentId: rentId } });
    return true;
  }

  async update(rentId: string, updates: Record<string, any>): Promise<any> {
    await SequelizeRentModel.update(updates, {
      where: { id: rentId },
    });

    if (updates.rentItems) {
      const itemsToUpdate = Array.isArray(updates.rentItems)
        ? updates.rentItems
        : [updates.rentItems];
      await Promise.all(
        itemsToUpdate.map(async (rentItem: RentItem) => {
          await SequelizeRentItemModel.update(rentItem, {
            where: { id: rentItem.id },
          });
        })
      );
    }
    return true;
  }
}
