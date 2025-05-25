import { ServiceDTO } from "../../dto";
import { Service } from "../../entities";

export interface IServicesService {
    getAll(): Promise<Service[]>,
    getFields(): Promise<unknown[]>
    create(serviceData: Omit<ServiceDTO, "id">): Promise<Service>,
    getById(serviceId: string): Promise<Service>,
    update(serviceId: string, updates: any): Promise<Service>,
    delete(serviceId: string): Promise<boolean>
}
