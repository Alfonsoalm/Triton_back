import { Request, Response } from "express";
import { IContactsService } from "../domain";

export const getFieldsController = (contactsService: IContactsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const fields = await contactsService.getFields();
            res.status(200).json({
                message: "Fields found",
                data: fields
            });
            
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
                res.status(500).json({
                    message: "Internal server error.",
                    error: error.message
                });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }
}