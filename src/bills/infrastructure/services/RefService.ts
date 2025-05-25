import { IRefService } from "../../domain/services/secondary/IRefService";


export class RefService implements IRefService {
    generate(date: Date): string {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(1000 + Math.random() * 9000); // 4-digit

        return `FAC-${yyyy}${mm}${dd}-${random}`;
    }

    validate(id: string): boolean {
        const pattern = /^FAC-\d{8}-\d{4}$/;
        return pattern.test(id);
    }
}
