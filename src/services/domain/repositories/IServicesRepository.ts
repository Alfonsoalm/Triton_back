import { Service } from "../entities";

export interface IServicesRepository{
    getAll(): Promise<Service[]>,
    getFields(): Promise<unknown[]>,
    create(service: Service): Promise<Service>,
    getById(serviceId: string): Promise<Service>,
    update(serviceId: string, updates: any): Promise<Service>,
    delete(serviceId: string): Promise<boolean>,
}