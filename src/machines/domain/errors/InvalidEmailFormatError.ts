import { CustomError } from "../../../_utils";

export class InvalidEmailFormatError extends CustomError {
  constructor() {
    super("Invalid email format", 400);
  }
}
