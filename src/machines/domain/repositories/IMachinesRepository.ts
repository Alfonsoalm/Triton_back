import { Machine } from "../entities";

export interface IMachinesRepository{
    getAll(): Promise<Machine[]>,
    getFields(): Promise<unknown[]>,
    create(machine: Machine): Promise<Machine>,
    getById(machineId: string): Promise<Machine>,
    update(machineId: string, updates: any): Promise<Machine>,
    delete(machineId: string): Promise<boolean>,
}