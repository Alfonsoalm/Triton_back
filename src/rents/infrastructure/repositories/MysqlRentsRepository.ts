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
            serial_number,
            daily_rental_price,
            sale_price,
            tax,
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
            serial_number: serial_number,
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
        serial_number,
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
        serial_number: serial_number,
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
          serial_number: rentItem.serial_number,
          daily_rental_price: rentItem.daily_rental_price,
          sale_price: rentItem.sale_price,
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
    const rentUpdates: Record<string, any> = {};
    const rentItemsUpdates: RentItem[] = updates.rentItems;
     for (const key in updates) {
      if (key !== 'rentItems') {
        rentUpdates[key] = updates[key];
      }
    }

    const rentEntity = Rent.createExistingRent(
      rentId,
      rentUpdates.name,
      rentUpdates.id_contact,
      rentUpdates.begin_date,
      rentUpdates.end_date,
      rentUpdates.status,
      rentUpdates.observations,
      rentUpdates.payment_method,
      rentItemsUpdates,
    );

    const rentUpdatesWithTotal = {
      'name': rentUpdates.name,
      'id_contact': rentUpdates.id_contact,
      'begin_date': rentUpdates.begin_date,
      'end_date': rentUpdates.end_date,
      'status': rentUpdates.status,
      'payment_method': rentUpdates.payment_method,
      'observations': rentUpdates.observations,
      'total': rentEntity.total,
      'subtotal': rentEntity.subtotal,
      'deposit': rentEntity.deposit,
    }

    if (Object.keys(rentUpdates).length > 0) {
      await SequelizeRentModel.update(rentUpdatesWithTotal, {
        where: { id: rentId },
      });
    }

     if (rentItemsUpdates) {
      // Primero, eliminamos los ítems existentes para este presupuesto para manejar eliminaciones
      await SequelizeRentItemModel.destroy({ where: { rentId: rentId } });

      // Luego, creamos/recreamos todos los ítems de la lista actualizada
      await Promise.all(
        rentItemsUpdates.map(async (rentItem: RentItem) => {
          await SequelizeRentItemModel.create({
            'id': rentItem.id,
            'rentId': rentId,
            'itemId': rentItem.itemId,
            'description': rentItem.description,
            'quantity': rentItem.quantity,
            'serial_number': rentItem.serial_number,
            'begin_date': rentItem.begin_date,
            'end_date': rentItem.end_date,
            'daily_rental_price': rentItem.daily_rental_price,
            'sale_price': rentItem.sale_price,
            'subtotal': rentItem.subtotal,
            'tax': rentItem.tax,
            'total': rentItem.total,
            'deposit': rentItem.deposit,
          });
        })
      );
    }
    return true;
  }
}
