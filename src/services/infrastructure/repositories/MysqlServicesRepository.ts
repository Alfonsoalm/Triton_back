// servicesRepository.ts (Suggested new file name)
import { sequelize } from "../../../_config/connection"; 
import { Service, IServicesRepository } from "../../domain";
import SequelizeServiceModel from "../models/SequelizeServiceModel"; 

export class MysqlServicesRepository implements IServicesRepository { 
  async getAll(): Promise<Service[]> {
    const servicesData = await SequelizeServiceModel.findAll(); 
    const services = servicesData.map((service) => {
      const {                      
        id,
        description,
        price,
        cost,
        tax,
        reference,
      } = service.dataValues;
      return Service.createExistingService(
        id,
        description,
        price,
        cost,
        tax,
        reference
      );
    });
    return services;
  }

  async getById(serviceId: string): Promise<Service> {
    const service = await SequelizeServiceModel.findOne({ where: { id: serviceId } });
    if (!service) throw new Error(`No se encontró un servicio con el id ${serviceId}`);
    const {
      description,
      price,
      cost,
      tax,
      reference,
    } = service.dataValues;
    return Service.createExistingService(
      serviceId,
      description,
      price,
      cost,
      tax,
      reference
    );
  }

  async getFields(): Promise<unknown[]> {
    const query = `DESCRIBE services;`; 
    const [fields] = await sequelize.query(query);
    return fields;
  }

  async create(newService: Service): Promise<Service> { 
    const createdService = await SequelizeServiceModel.create(newService.toJSON() as any);
    const serviceData = createdService.get();
    const {
      id,
      description,
      price,
      cost,
      tax,
      reference,
    } = serviceData;
    return Service.createExistingService(
      id,
      description,
      price,
      cost,
      tax,
      reference
    );
  }

  async delete(serviceId: string): Promise<boolean> {
    await SequelizeServiceModel.destroy({ where: { id: serviceId } });
    return true;
  }

  async update(serviceId: string, updates: Record<string, any>): Promise<any> {
    return await SequelizeServiceModel.update(updates, {
      where: { id: serviceId },
    });
  }
}