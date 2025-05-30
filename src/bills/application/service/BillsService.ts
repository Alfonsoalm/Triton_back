import { IMachinesRepository, IMachinesService } from "../../../machines";
import { RentDTO } from "../../../rents/domain";
import { Bill, BillDTO, BillItem, BillPaymentStatus, BillType, IBillsRepository, IBillsService, IIdService} from "../../domain";
import { IRefService } from "../../domain/services/secondary/IRefService";

export class BillsService implements IBillsService{

    private readonly _billsRepo: IBillsRepository;
    private readonly _idService: IIdService;
    private readonly _refService: IRefService;
    private readonly _machinesRepo: IMachinesRepository;

    constructor(repository: IBillsRepository, idService: IIdService, refService: IRefService, machinesRepo: IMachinesRepository) {
        this._billsRepo = repository;
        this._idService = idService;
        this._refService = refService;
        this._machinesRepo = machinesRepo;

    }

    async getAll(filters: Record<string, any> = {}): Promise<Bill[]> {
        const result = await this._billsRepo.getAll();
        
        return result;
    }

    async getById(billId: string): Promise<Bill> {
        const result = await this._billsRepo.getById(billId);

        return result;
    }

    async delete(billId: string): Promise<boolean> {
        console.log("Entro en delete", billId);

        const result = await this._billsRepo.delete(billId);

        return result;
    }

    async getFields(): Promise<unknown[]> {

        return await this._billsRepo.getFields();
    }

    async create(billData: Omit<BillDTO, "id">): Promise<Bill> {
        
        const { bill_ref,
                bill_type,
                doc_ref, 
                id_customer,
                creation_date,
                due_date, 
                deposit, 
                subtotal,
                total,
                monetary_units,
                payment_method,
                payment_status,
                bill_items,
        } = billData;

        const newBill = await Bill.createNewBill(
            this._idService,
            bill_ref,
            bill_type,
            doc_ref,
            id_customer,
            creation_date,
            due_date,
            deposit,
            payment_method,
            payment_status,
            bill_items,
        )

        return await this._billsRepo.create(newBill);
    }

    async update(billId: string, updates: any): Promise<Bill> {

        console.log("Entro en update", billId, updates);

        const result = await this._billsRepo.update(billId, updates);

        return result;
    }

    
    async createBillFromRent(rentData: RentDTO, creation_date: Date, due_date: Date, deposit: number): Promise<Bill> {
          const {
            id: rentId,
            name: rentRef,
            id_contact,
            rentItems,
        } = rentData;

        const billItemsPromises: Promise<BillItem>[] = rentItems.map(
            async (ri, index) => {
            const machine = await this._machinesRepo.getById(ri.itemId);
            const itemSubtotal = ri.quantity * machine.price;
            const itemTotal = itemSubtotal;

            const description = `Alquiler de máquina ${machine.model} - ${machine.brand} ` +
                `con SN ${machine.serial_number} del ${new Date(ri.begin_date).toLocaleDateString()} ` +
                `al ${new Date(ri.end_date).toLocaleDateString()}`;


            return {
                id: `${rentId}-${index + 1}`,
                position: index + 1,
                description,
                quantity: ri.quantity,
                unit_price: machine.price,
                item_subtotal: itemSubtotal,
                item_total: itemTotal,
                monetary_units: '€',
            };
            }
        );

        // 2) Esperamos a que todas las promesas terminen
        const billItems: BillItem[] = await Promise.all(billItemsPromises);

        // 3) Calculamos subtotal y total
        const subtotal = billItems.reduce((sum, item) => sum + item.item_subtotal, 0);
        const total    = billItems.reduce((sum, item) => sum + item.item_total, 0);

        // 4) Creamos la factura
        const newBill = await Bill.createNewBill(
            this._idService,
            this._refService.generate(creation_date),
            BillType.Rent,
            rentRef,
            id_contact,
            creation_date,
            due_date,
            deposit,
            'credit_card',
            BillPaymentStatus.NotPaid,
            billItems,
        );

        // 5) Persistimos y devolvemos
        return this._billsRepo.create(newBill);
    }
}