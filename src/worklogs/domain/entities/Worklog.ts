import { IIdService } from "../services";

// Quote.ts
export class Worklog{
    // Requeridos
    private _id: string = '';
    private _id_employee: number = 0;
    private _log_datetime: Date;
    private _type: string = '';
    private _observations: string;

    private constructor(
        id: string,
        id_employee: number, 
        log_datetime: Date, 
        type: string, 
        observations: string,
    ) {
        this._id = id;
        this._id_employee = id_employee;
        this._log_datetime = log_datetime;
        this._type = type;
        this._observations = observations;
    }
    
    public static async createNewQuote( 
        idGenerator: IIdService,
        id_employee: number, 
        log_datetime: Date, 
        type: string, 
        observations: string,
    ): Promise<Worklog> {
        const id = idGenerator.generate();
        return new Worklog(
        id, 
        id_employee, 
        log_datetime, 
        type, 
        observations,
        );
    }

    public static createExistingQuote( 
        id: string, 
        id_employee: number, 
        log_datetime: Date, 
        type: string, 
        observations: string,
    ): Worklog {
        return new Worklog(
        id, 
        id_employee, 
        log_datetime, 
        type, 
        observations,
        );
    }

    public toJSON(): object {
        return {
        id: this._id,
        id_employee: this._id_employee,
        log_datetime: this._log_datetime,
        type: this._type,
        observations: this._observations,
        }
    }
}