// contactsRepository.ts
import { sequelize } from '../../../_config/connection'; // Asegúrate de importar la conexión a la BD
import { Quote, IQuotesRepository} from "../../domain";
import SequelizeQuoteModel from '../models/SequelizeQuoteModel';

export class MysqlQuotesRepository implements IQuotesRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {Record<string, any>} filters - Objeto con los filtros para la consulta.
   * @returns {Promise<any[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getAll(): Promise<Quote[]> {

    const quotesData = await SequelizeQuoteModel.findAll();

    const quotes = quotesData.map(quote => {
      const { 
        id, 
        name, 
        id_contact, 
        creation_date, 
        payment_method,
        status,
      } = quote.dataValues;
      return Quote.createExistingQuote(
        id,
        name,
        id_contact, 
        creation_date, 
        payment_method,
        status,
      );
    })
    return quotes;
  }

    /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {string} quoteId - Datos del empleado a insertar.
   * @returns {Promise<any>} - Devuelve los datos del empleado insertado.
   */
  async getById(quoteId: string): Promise<Quote> {
    const quote = await SequelizeQuoteModel.findOne({ where: { id: quoteId } });
    if (!quote) {
        throw new Error(`No se encontró un presupuesto con el id ${quoteId}`);
    }
    const { 
      name,
      id_contact, 
      creation_date, 
      payment_method,
      status,
    } = quote.dataValues;
    return Quote.createExistingQuote(
      quoteId,
      name,
      id_contact, 
      creation_date, 
      payment_method,
      status,
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
    return Quote.createExistingQuote(
      id,
      name,
      id_contact, 
      creation_date, 
      payment_method,
      status,
    );
  }
  /**
   * Elimina empleados que coincidan con los filtros proporcionados.
   * @param {string} quoteId - Objeto con los filtros para la eliminación.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async delete(quoteId: string): Promise<boolean> {
    await SequelizeQuoteModel.destroy({ where: {id: quoteId} });
    return true;
  }
  /**
   * Actualiza contactos que coincidan con los filtros proporcionados.
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @param {string} quoteId - Filtros para identificar los empleados a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(quoteId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeQuoteModel.update(updates, {
      where: {id: quoteId},
    });
  }
}

