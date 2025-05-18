// contactsRepository.ts
import { sequelize } from '../../../_config/connection'; // Asegúrate de importar la conexión a la BD
import { Quote, IQuotesRepository, QuoteItem} from "../../domain";
import SequelizeQuoteItemModel from '../models/SequelizeQuoteItemModel';
import SequelizeQuoteModel from '../models/SequelizeQuoteModel';

export class MysqlQuotesRepository implements IQuotesRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {Record<string, any>} filters - Objeto con los filtros para la consulta.
   * @returns {Promise<any[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getAll(): Promise<Quote[]> {
    const quotesData = await SequelizeQuoteModel.findAll();
    const quotes = await Promise.all(
      quotesData.map( async (quote) => {
        const { 
          id, 
          name, 
          id_contact, 
          creation_date, 
          payment_method,
          status,
        } = quote.dataValues;
        const quoteId = id;
        const quoteItemsData = await SequelizeQuoteItemModel.findAll({ where: { "quote_id" : quoteId}});
        const quoteItemsArray: QuoteItem[] = [];
        quoteItemsData.map( async (quoteItem) => {
          const {
            id,
            quote_id,
            position,
            type,
            item_id,
            description,
            quantity,
          } = quoteItem.dataValues;
          quoteItemsArray.push({
            id: id,
            position: position,
            type: type,
            item_id: item_id,
            description: description,
            quantity: quantity,
          })
        })
        return Quote.createExistingQuote(
          id,
          name,
          id_contact, 
          creation_date, 
          status,
          quoteItemsArray,
          payment_method
        );
      })
    );
    return quotes;
  }

    /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {string} quoteId - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
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
      status,
      payment_method,
    } = quote.dataValues;
    const quoteItemsData = await SequelizeQuoteModel.findAll({ where: { "quote_id" : quoteId}})
    const quoteItemsArray: QuoteItem[] = [];
    quoteItemsData.map( async (quoteItem) => {
      const { 
        id,
        quote_id,
        position,
        type,
        item_id,
        description,
        quantity,
      } = quoteItem.dataValues;
      quoteItemsArray.push({
        id: id,
        position: position,
        type: type,
        item_id: item_id,
        description: description,
        quantity: quantity,
      });
    })
    return Quote.createExistingQuote(
        quoteId,
        name,
        id_contact, 
        creation_date, 
        status,
        quoteItemsArray,
        payment_method
      );
  }
  /**
   * Obtiene los metadatos de la tabla employees.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE quotes;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }
  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {Quote} quoteN - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async create(quoteN: Quote): Promise<Quote> {
    const quoteWithoutItems = quoteN.toJSON();
    const newQuote = await SequelizeQuoteModel.create(quoteN.toJSON() as any);
    const quoteData = newQuote.get();
    const {
      id,
      name,
      id_contact, 
      creation_date, 
      payment_method,
      status,
    } = quoteData;
    const quoteId = id;
    const quoteItems: QuoteItem[] = quoteN.items;
    if (quoteItems !== undefined)
      quoteItems.map( async (quoteItem: QuoteItem) => {
        const newQuoteItem = await SequelizeQuoteItemModel.create({
          'id': quoteItem.id,
          'quote_id': quoteId,
          'position': quoteItem.position,
          'type': quoteItem.type,
          'item_id': quoteItem.item_id,
          'description': quoteItem.description,
          'quantity': quoteItem.quantity,
        });
      });

    return Quote.createExistingQuote(
      id,
      name,
      id_contact, 
      creation_date, 
      status,
      quoteItems,
      payment_method,
    );
  }
  /**
   * Elimina empleados que coincidan con los filtros proporcionados.
   * @param {string} quoteId - Objeto con los filtros para la eliminación.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async delete(quoteId: string): Promise<boolean> {
    await SequelizeQuoteModel.destroy({ where: {id: quoteId} });
    await SequelizeQuoteItemModel.destroy({ where: {quote_id: quoteId}});
    return true;
  }
  /**
   * Actualiza contactos que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {string} quoteId - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(quoteId: string, updates: Record<string, any>): Promise<any> {
    await SequelizeQuoteModel.update(updates, {
      where: {id: quoteId},
    });

    if (updates.quoteItems) {
      const itemsToUpdate = Array.isArray(updates.quoteItems) ? updates.quoteItems : [updates.quoteItems];
      await Promise.all(
        itemsToUpdate.map(async (quoteItem: QuoteItem) => {
          await SequelizeQuoteItemModel.update(quoteItem, { where: {id: quoteItem.id}});
        })
      );
    }
    return true; 
  }
}

