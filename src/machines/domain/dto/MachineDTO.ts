export interface MachineDTO{
    id: string;
    name: string;
    model: string;
    serial_number: string;
    description: string;
    price?: number;
    deposit: number;
    available: boolean;
    state: string;
}
