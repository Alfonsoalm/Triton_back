// contactsRepository.ts
import { sequelize } from '../../../_config/connection';
import { Quote, IQuotesRepository, QuoteItem } from "../../domain"; // Asegúrate de que QuoteItem esté correctamente importado del dominio
import SequelizeQuoteItemModel from '../models/SequelizeQuoteItemModel';
import SequelizeQuoteModel from '../models/SequelizeQuoteModel';

export class MysqlQuotesRepository implements IQuotesRepository {
  /**
   * Obtiene todos los presupuestos con sus ítems.
   * @returns {Promise<Quote[]>} - Devuelve una lista de presupuestos.
   */
  async getAll(): Promise<Quote[]> {
    const quotesData = await SequelizeQuoteModel.findAll();
    const quotes = await Promise.all(
      quotesData.map(async (quote) => {
        const {
          id,
          name,
          id_contact,
          creation_date,
          payment_method,
          status,
          total,
          subtotal,
        } = quote.dataValues;

        const quoteItemsData = await SequelizeQuoteItemModel.findAll({ where: { "quote_id": id } }); // Usamos 'id' directamente
        const quoteItemsArray: QuoteItem[] = quoteItemsData.map((quoteItem) => {
          const {
            id,
            position,
            type,
            item_id,
            description,
            quantity,
            price,    // Incluimos price
            subtotal,
            tax,      // Incluimos tax
            total,
          } = quoteItem.dataValues;
          return {
            id: id,
            position: position,
            key: id, // Asumimos que 'id' puede servir como 'key' para listas de React
            type: type,
            item_id: item_id,
            // 'service_id' ya no está en la interfaz QuoteItem
            description: description,
            quantity: quantity,
            price: parseFloat(price), // Convertimos DECIMAL a number
            subtotal: parseFloat(subtotal),
            tax: parseFloat(tax),     // Convertimos DECIMAL a number
            total: parseFloat(total),
          };
        });

        return Quote.createExistingQuote(
          id,
          name,
          id_contact,
          creation_date,
          status,
          quoteItemsArray,
          payment_method,
        );
      })
    );
    return quotes;
  }

  /**
   * Obtiene un presupuesto por su ID.
   * @param {string} quoteId - ID del presupuesto.
   * @returns {Promise<Quote>} - Devuelve el presupuesto encontrado.
   */
  async getById(quoteId: string): Promise<Quote> {
    const quote = await SequelizeQuoteModel.findOne({ where: { "id": quoteId } });
    if (!quote) {
      throw new Error(`No se encontró un presupuesto con el id ${quoteId}`);
    }
    const {
      id,
      name,
      id_contact,
      creation_date,
      total,
      subtotal,
      status,
      payment_method,
    } = quote.dataValues;

    // Obtenemos los ítems del presupuesto correctamente usando el ID del presupuesto
    const quoteItemsData = await SequelizeQuoteItemModel.findAll({ where: { "quote_id": id } });
    const quoteItemsArray: QuoteItem[] = quoteItemsData.map((quoteItem) => {
      const {
        id,
        position,
        type,
        item_id,
        description,
        quantity,
        price,    // Incluimos price
        subtotal,
        tax,      // Incluimos tax
        total,
      } = quoteItem.dataValues;
      return {
        id: id,
        position: position,
        key: id, // Asumimos que 'id' puede servir como 'key'
        type: type,
        item_id: item_id,
        // 'service_id' ya no está en la interfaz QuoteItem
        description: description,
        quantity: quantity,
        price: parseFloat(price), // Convertimos DECIMAL a number
        subtotal: parseFloat(subtotal),
        tax: parseFloat(tax),     // Convertimos DECIMAL a number
        total: parseFloat(total),
      };
    });

    return Quote.createExistingQuote(
      id, // Usamos 'id' de quote.dataValues
      name,
      id_contact,
      creation_date,
      status,
      quoteItemsArray,
      payment_method
    );
  }

  /**
   * Obtiene los metadatos de la tabla quotes.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE quotes;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  /**
   * Inserta un nuevo presupuesto en la base de datos.
   * @param {Quote} quoteN - Datos del presupuesto a insertar.
   * @returns {Promise<any>} - Devuelve los datos del presupuesto insertado.
   */
  async create(quoteN: Quote): Promise<Quote> {
    // Es mejor pasar solo las propiedades de alto nivel del presupuesto a SequelizeQuoteModel.create
    // y luego manejar los ítems del presupuesto por separado.
    const newQuote = await SequelizeQuoteModel.create({
        id: quoteN.id, // Accedemos a id a través del getter
        name: quoteN.name, // Accedemos a name a través del getter
        id_contact: quoteN.id_contact, // Accedemos a id_contact a través del getter
        creation_date: quoteN.creation_date, // Accedemos a creation_date a través del getter
        status: quoteN.status, // Accedemos a status a través del getter
        payment_method: quoteN.payment_method, // Accedemos a payment_method a través del getter
    } as any); // Hacemos un 'cast' a 'any' si el método create de Sequelize espera un objeto plano

    const quoteData = newQuote.get();
    const {
      id,
      name,
      id_contact,
      creation_date,
      total,
      subtotal,
      payment_method,
      status,
    } = quoteData;  

    const quoteItems: QuoteItem[] = quoteN.quote_items;
    const quoteEntity = Quote.createExistingQuote(
      id,
      name,
      id_contact,
      creation_date,
      status,
      quoteItems,
      payment_method,
    );
    
    if (quoteItems && quoteItems.length > 0) {
      await Promise.all(
        quoteItems.map(async (quoteItem: QuoteItem) => {
          await SequelizeQuoteItemModel.create({
            'id': quoteItem.id,
            'quote_id': id,
            'position': quoteItem.position,
            'type': quoteItem.type,
            'item_id': quoteItem.item_id,
            'description': quoteItem.description,
            'quantity': quoteItem.quantity,
            'price': quoteItem.price,
            'tax': quoteItem.tax,
            'total': quoteItem.total,
            'subtotal': quoteItem.subtotal,
          });
        })
      );
    }

    return quoteEntity;
  }

  /**
   * Elimina presupuestos que coincidan con los filtros proporcionados.
   * @param {string} quoteId - ID del presupuesto a eliminar.
   * @returns {Promise<boolean>} - True si se eliminó, false si no.
   */
  async delete(quoteId: string): Promise<boolean> {
    await SequelizeQuoteItemModel.destroy({ where: { quote_id: quoteId } }); // Eliminar ítems primero
    const deletedRows = await SequelizeQuoteModel.destroy({ where: { id: quoteId } });
    return deletedRows > 0;
  }

  /**
   * Actualiza presupuestos que coincidan con los filtros proporcionados.
   * @param {string} quoteId - ID del presupuesto a actualizar.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @returns {Promise<any>} - Devuelve true si se actualizó, false si no.
   */
  async update(quoteId: string, updates: Record<string, any>): Promise<any> {
    const quoteUpdates: Record<string, any> = {};
    const quoteItemsUpdates: QuoteItem[] | undefined = updates.quoteItems;

    for (const key in updates) {
      if (key !== 'quoteItems') {
        quoteUpdates[key] = updates[key];
      }
    }
    const quoteEntity = Quote.createExistingQuote(
      quoteId,
      quoteUpdates.name,
      quoteUpdates.id_contact,
      quoteUpdates.creation_date,
      quoteUpdates.status,
      quoteUpdates.quoteItems,
      quoteUpdates.payment_method,
    );

    const quoteUpdatesWithTotal = {
      'name': quoteUpdates.name,
      'id_contact': quoteUpdates.id_contact,
      'creation_date': quoteUpdates.creation_date,
      'payment_method': quoteUpdates.payment_method,
      'status': quoteUpdates.status,
      'total': quoteEntity.total,
      'subtotal': quoteEntity.subtotal
    }

    if (Object.keys(quoteUpdates).length > 0) {
      await SequelizeQuoteModel.update(quoteUpdatesWithTotal, {
        where: { id: quoteId },
      });
    }

    if (quoteItemsUpdates) {
      // Primero, eliminamos los ítems existentes para este presupuesto para manejar eliminaciones
      await SequelizeQuoteItemModel.destroy({ where: { quote_id: quoteId } });

      // Luego, creamos/recreamos todos los ítems de la lista actualizada
      await Promise.all(
        quoteItemsUpdates.map(async (quoteItem: QuoteItem) => {
          await SequelizeQuoteItemModel.create({
            'id': quoteItem.id,
            'quote_id': quoteId,
            'position': quoteItem.position,
            'type': quoteItem.type,
            'item_id': quoteItem.item_id,
            'description': quoteItem.description,
            'quantity': quoteItem.quantity,
            'price': quoteItem.price,
            'subtotal': quoteItem.subtotal,
            'tax': quoteItem.tax,
            'total': quoteItem.total,
          });
        })
      );
    }
    return true;
  }
}