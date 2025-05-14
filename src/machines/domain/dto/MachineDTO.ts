export interface MachineDTO{
    id: string;
    type: string;
    model: string;
    brand: string;
    serial_number: string;
    description: string;
    price?: number;
    deposit: number;
    available: boolean;
    state: string;
}
