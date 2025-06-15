// CashFlow.ts
import { IIdService } from "../services";

// Quote.ts
export enum CashFlowType {
  Inflow = "inflow",
  Outflow = "outflow",
}

export enum CashFlowReferenceType {
  Quote = "quote",
  Rent = "rent",
}

export class CashFlow{
    // Requeridos
    private _id: string = '';
    private _type: CashFlowType;
    private _category: string = '';
    private _amount: number = 0;
    private _date: Date;
    private _description?: string = '';
    private _reference_id?: string = '';
    private _reference_type?: CashFlowReferenceType;
    private _center_id?: string = '';

    private constructor(
        id: string, type: CashFlowType, 
        category: string, amount: number,
        date: Date, description?: string,
        reference_id?: string, reference_type?: CashFlowReferenceType,
        center_id?: string) {
        this._id = id;
        this._type = type;
        this._category = category;
        this._amount = amount;
        this._date = date;
        this._description = description;
        this._reference_id = reference_id;
        this._reference_type = reference_type;
        this._center_id = center_id;
    }
    
    public static async createNewCashFlow( idGenerator: IIdService,
        type: CashFlowType, 
        category: string, amount: number, 
        date: Date, description?: string,
        reference_id?: string, reference_type?: CashFlowReferenceType,
        center_id?: string
    ): Promise<CashFlow> {
        const id = idGenerator.generate();
        return new CashFlow(id, type, category, amount, date, description, reference_id, reference_type, center_id);
    }

    public static createExistingCashFlow( 
        id: string, type: CashFlowType, 
        category: string, amount: number, 
        date: Date, description?: string,
        reference_id?: string, reference_type?: CashFlowReferenceType,
        center_id?: string): CashFlow {
        return new CashFlow(id, type, category, amount, date, description, reference_id, reference_type, center_id);
    }

    public toJSON(): object {
        return {
            id: this._id,
            type: this._type,
            category: this._category,
            amount: this._amount,
            date: this._date,
            description: this._description,
            reference_id: this._reference_id,
            reference_type: this._reference_type,
            center_id: this._center_id,
        }
    }
}