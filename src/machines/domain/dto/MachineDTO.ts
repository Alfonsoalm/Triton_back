import { MachineStatus } from "../entities";

export interface MachineDTO {
  id: string;
  type: string;
  model: string;
  brand?: string;

  serial_number?: string;
  reference?: string;
  description?: string;

  daily_rental_price?: number;
  sale_price?: number;
  deposit?: number;
  cost?: number;
  tax?: number;

  available?: boolean;
  status?: MachineStatus;

  id_supplier?: string;
  id_center?: string;
  id_owner?: string;
}