import { CustomError } from "../../../_utils";

export class EmailAlreadyExitsError extends CustomError{
    constructor(){
        super("Email already exits", 400);
    }
}