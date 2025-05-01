import { Request, Response } from "express"
import { IContactsService } from "../domain";

export const deleteController = (contactsService: IContactsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { contactId } = req.params;
            const isDeleted = await contactsService.delete(contactId);
    
            res.status(200).json({
                message: "Contact obtained",
                data: isDeleted
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