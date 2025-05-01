import { MachineDTO } from "../../dto";
import { Machine } from "../../entities";

export interface IMachinesService{
    getAll(): Promise<Machine[]>,
    getFields(): Promise<unknown[]>
    create(machineData: Omit<MachineDTO, "id">): Promise<Machine>,
    getById(machineId: string): Promise<Machine>,
    update(machineId: string, updates: any): Promise<Machine>,
    delete(machineId: string): Promise<boolean>
}
