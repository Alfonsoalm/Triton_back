import { IRefService } from "../../domain/services/secondary/IRefService";

export class RefService implements IRefService {
    /**
     * Genera una referencia de factura basada en date, acepta Date o string ISO.
     */
    generate(dateInput: Date | string): string {
        // Asegurar que trabajamos con un objeto Date
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date input for generate: ${dateInput}`);
        }

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(1000 + Math.random() * 9000); // 4 dígitos aleatorios

        return `FAC-${yyyy}${mm}${dd}-${random}`;
    }

    /**
     * Valida que la referencia tenga el formato FAC-YYYYMMDD-NNNN
     */
    validate(id: string): boolean {
        const pattern = /^FAC-\d{8}-\d{4}$/;
        return pattern.test(id);
    }
}
