import { ContactType, ContactCategory } from "../entities";

export interface ContactDTO{
    id: string;
    name: string;
    first_name: string;
    type: ContactType;
    mail?: string;
    phone?: string;
    nif?: string;
    nif_url?: string;
    address?: string;
    id_account?: string;
    category?: ContactCategory;
    access?: boolean;
}
