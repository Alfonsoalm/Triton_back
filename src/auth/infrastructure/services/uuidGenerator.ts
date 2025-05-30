import { v4, validate } from "uuid";
import { IIdService } from "../../domain";

export class UuidGenerator implements IIdService{
    generate(): string {
        return v4();
    }
    validate(id: string): boolean {
        return validate(id)
    }
}