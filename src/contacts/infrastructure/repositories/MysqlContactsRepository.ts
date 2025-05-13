// contactsRepository.ts
import { sequelize } from '../../../_config/connection'; // Asegúrate de importar la conexión a la BD
import { Contact, IContactsRepository, ContactType, ContactCategory } from "../../domain";
import SequelizeContactModel from '../models/SequelizeContactModel';

export class MysqlContactsRepository implements IContactsRepository{
  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @returns {Promise<Contact[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getAll(): Promise<Contact[]> {
    const contactsData = await SequelizeContactModel.findAll();
    const contacts = contactsData.map(contact => {     
      const { id, name, first_name, nif, nif_url, mail, phone, type, category, address, id_account, banned } = contact.dataValues;
      return Contact.createExistingContact(
        id,
        name,
        first_name,
        type,
        mail,
        phone,
        nif,
        nif_url,
        address,
        id_account,
        category ? category as ContactCategory: undefined,
        banned
      );
    })
    return contacts;
  }

  /**
   * Obtiene empleados con filtros opcionales y aplica un mapeo para procesar los datos.
   * @param {string} type - type del contacto a buscar
   * @returns {Promise<Contact[]>} - Devuelve una lista de empleados con los datos procesados.
   */
  async getByType(type: string): Promise<Contact[]> {
    const contactsData = await SequelizeContactModel.findAll({ where: { type: type } });
    const contacts = contactsData.map(contact => {     
      const { id, name, first_name, nif, nif_url, mail, phone, type, category, address, id_account, banned } = contact.dataValues;
      return Contact.createExistingContact(
        id,
        name,
        first_name,
        type,
        mail,
        phone,
        nif,
        nif_url,
        address,
        id_account,
        category ? category as ContactCategory: undefined,
        banned
      );
    })
    return contacts;
  }

  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {string} contactId - id del contacto a buscar
   * @returns {Promise<Contact>} - Devuelve los datos del contact insertado.
   */
  async getById(contactId: string): Promise<Contact> {
    const contact = await SequelizeContactModel.findOne({ where: { id: contactId } });
    if (!contact) throw new Error(`No se encontró un contacto con el id ${contactId}`);
    const { id, name, first_name, nif, nif_url, mail, phone, type, category, address, id_account, banned } = contact.dataValues;
    return Contact.createExistingContact(
      contactId,
      name,
      first_name,
      type,
      mail,
      phone,
      nif,
      nif_url,
      address,
      id_account,
      category ? category as ContactCategory: undefined,
      banned
    );
  }

  /**
   * Obtiene los metadatos de la tabla employees.
   * @returns {Promise<any[]>} - Devuelve la lista de campos de la tabla.
   */
  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE contacts;`;
    const [fields] = await sequelize.query(query);
    return fields;
  }

  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {Contact} contactN - Datos del empleado a insertar.
   * @returns {Promise<Contact>} - Devuelve los datos del contact insertado.
   */
  async create(contactN: Contact): Promise<Contact> {
    const newContact = await SequelizeContactModel.create(contactN.toJSON() as any);
    const contactData = newContact.get();
    const {id, name, first_name, type, mail, phone, nif, nif_url, address, id_account, category,
      banned} = contactData;
    return Contact.createExistingContact(
      id,
      name,
      first_name,
      type,
      mail,
      phone,
      nif,
      nif_url,
      address,
      id_account,
      category ? category as ContactCategory: undefined,
      banned
    );
  }
  /**
   * Elimina empleados que coincidan con los filtros proporcionados.
   * @param {string} contactId - id del contacto a borrar
   * @returns {Promise<boolean>} - boolean devuelto que indica borrado (1) o no (0)
   */
  async delete(contactId: string): Promise<boolean> {
    await SequelizeContactModel.destroy({ where: {id: contactId} });
    return true;
  }
  /**
   * Actualiza contactos que coincidan con los filtros proporcionados.
   * @param {string} contactId - id del contacto a actualizar
   * @param {Record<string, any>} updates - Datos a actualizar.
   * @returns {Promise<void>} - No devuelve nada.
   */
  async update(contactId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeContactModel.update(updates, {
      where: {id: contactId},
    });
  }
}

