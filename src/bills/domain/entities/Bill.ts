// Bill.ts
import { IIdService } from "../services";

export enum BillType {
	Quote = "quote",
	Rent = "rent",
	Other = "other",
}

export class Bill{
    // Requeridos
    private _id: string = '';
    private _bill_code: string = '';
    private _bill_type: BillType;
    private _doc_code: string = '';
    private _creation_date: Date;
    private _deposit: number = 0;
    private _total: number = 0;
    private _units: string = "€";
    private _payment_method: string;

    private constructor(
        id: string, 
        bill_code: string,
        bill_type: BillType, 
        doc_code: string,
        creation_date: Date,
        deposit: number,
        total: number,
        units: string,
        payment_method: string,
    ) {
        this._id = id;
        this._bill_code = bill_code;
        this._bill_type = bill_type;
        this._doc_code = doc_code;
        this._creation_date = creation_date;
        this._deposit = deposit;
        this._total = total;
        this._units = units;
        this._payment_method = payment_method;
    }
    
    public static async createNewBill( idGenerator: IIdService,
        bill_code: string,
        bill_type: BillType, 
        doc_code: string,
        creation_date: Date,
        deposit: number,
        total: number,
        units: string,
        payment_method: string,
    ): Promise<Bill> {
        const id = idGenerator.generate();
        return new Bill(id,
            bill_code,
            bill_type,
            doc_code,
            creation_date,
            deposit,
            total,
            units,
            payment_method);
    }

    public static createExistingBill(
        id: string, 
        bill_code: string,
        bill_type: BillType, 
        doc_code: string,
        creation_date: Date,
        deposit: number,
        total: number,
        units: string,
        payment_method: string,
    ): Bill {
        return new Bill(id,
            bill_code,
            bill_type,
            doc_code,
            creation_date,
            deposit,
            total,
            units,
            payment_method);
    }

    public toJSON(): object {
        return {
            id: this._id,
            bill_code: this._bill_code,
            bill_type: this._bill_type,
            doc_code: this._doc_code,
            creation_date: this._creation_date,
            deposit: this._deposit,
            total: this._total,
            units: this._units,
            payment_method: this._payment_method,
        }
    }
}