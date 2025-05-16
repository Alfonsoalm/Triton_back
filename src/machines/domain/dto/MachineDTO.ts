export interface MachineDTO {
  id: string;
  type: string;
  model: string;
  brand?: string;
  serial_number?: string;
  description?: string;
  price?: number;
  deposit?: number;
  available?: boolean;
  state?: string;
  cost?: number; // Añadido cost
  id_supplier?: string; // Añadido id_supplier
  reference?: string; // Añadido reference
  tax?: number; // Añadido tax
  id_center?: string; // Añadido id_center
}