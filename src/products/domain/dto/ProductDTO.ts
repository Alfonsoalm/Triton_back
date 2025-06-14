export interface ProductDTO {
  id: string;
  type: string;
  model: string;
  brand: string;
  description?: string;
  price?: number;
  quantity?: number;
  id_supplier?: string;
  cost?: number;
  tax?: number;
  reference?: string;
  id_center?: string;
}
