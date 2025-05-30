// Bill.ts
import { subscribe } from "diagnostics_channel";
import { IIdService } from "../services";
import { subtle } from "crypto";

export enum BillType {
	Quote = "quote",
	Rent = "rent",
	Other = "other",
}

export enum BillPaymentStatus {
    Paid = "paid",
    NotPaid = "not_paid",
}

export interface BillItem {
    id: string;
    position: number;
    description: string;
    quantity: number;
    unit_price: number;
    item_subtotal: number;
    item_total: number;
    monetary_units: string;
}

export class Bill{
    // Requeridos
    private _id: string = '';
    private _bill_ref: string = '';
    private _bill_type: BillType;
    private _doc_ref: string = '';
    private _id_customer: string = '';
    private _creation_date: Date;
    private _due_date: Date;
    private _deposit: number = 0;
    private _subtotal: number = 0;
    private _total: number = 0;
    private _monetary_units: string = "€";
    private _payment_method: string;
    private _payment_status: BillPaymentStatus;
    private _bill_items: BillItem[];

    private calculateSubtotal(): number {
        return this._bill_items.reduce((sum, item) => sum + item.item_subtotal, 0);
    }

    private calculateTotal(): number {
        return this._bill_items.reduce((sum, item) => sum + item.item_total, 0);
    }

    private constructor(
        id: string, 
        bill_ref: string,
        bill_type: BillType, 
        doc_ref: string,
        id_customer: string,
        creation_date: Date,
        due_date: Date,
        deposit: number,
        payment_method: string,
        payment_status: BillPaymentStatus,
        bill_items: BillItem[],
    ) {
        this._id = id;
        this._bill_ref = bill_ref;
        this._bill_type = bill_type;
        this._doc_ref = doc_ref;
        this._id_customer = id_customer;
        this._creation_date = creation_date;
        this._due_date = due_date;
        this._deposit = deposit;
        this._payment_method = payment_method;
        this._payment_status = payment_status; 
        this._bill_items = bill_items;

        this._subtotal = this.calculateSubtotal();
        this._total = this.calculateTotal();
        if (bill_items[0] !== undefined)
            this._monetary_units = bill_items[0].monetary_units;
        else 
            this._monetary_units = '€';
    }
    
    public static async createNewBill(
        idGenerator: IIdService,
        bill_ref: string,
        bill_type: BillType, 
        doc_ref: string,
        id_customer: string,
        creation_date: Date,
        due_date: Date,
        deposit: number,
        payment_method: string,
        payment_status: BillPaymentStatus,
        bill_items: BillItem[],
    ): Promise<Bill> {
        const id = idGenerator.generate();
        return new Bill(
            id,
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
        );
    }

    public static createExistingBill(
        id: string, 
        bill_ref: string,
        bill_type: BillType, 
        doc_ref: string,
        id_customer: string,
        creation_date: Date,
        due_date: Date,
        deposit: number,
        payment_method: string,
        payment_status: BillPaymentStatus,
        bill_items: BillItem[],
    ): Bill {
        return new Bill(id,
            bill_ref,
            bill_type,
            doc_ref,
            id_customer,
            creation_date,
            due_date,
            deposit,
            payment_method,
            payment_status,
            bill_items);
    }

    public toJSON(): object {
        return {
            id: this._id,
            bill_ref: this._bill_ref,
            bill_type: this._bill_type,
            doc_ref: this._doc_ref,
            id_customer: this._id_customer,
            creation_date: this._creation_date,
            due_date: this._due_date,
            deposit: this._deposit,
            subtotal: this._subtotal,
            total: this._total,
            monetary_units: this._monetary_units,
            payment_method: this._payment_method,
            payment_status: this._payment_status,
            bill_items: this._bill_items,
        }
    }

    public addItem(item: BillItem) {
        this._bill_items.push(item);
    }

    public get items(): BillItem[] { // Añade este getter
        return this._bill_items;
    }

    public get id_contact(): string {
        return this._id_customer;
    }

    public set id_contact(value: string) {
        this._id_customer = value;
    }

    public get creation_date(): Date {
        return this._creation_date;
    }

    public set creation_date(value: Date) {
        this._creation_date = value;
    }
}