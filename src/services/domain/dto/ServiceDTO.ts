// If this DTO is strictly for a 'Service' as defined by your 'export interface Service'
export interface ServiceDTO {
  id: string;
  description: string;
  price: number;
  cost?: number;
  tax?: number;
  reference?: string;
}