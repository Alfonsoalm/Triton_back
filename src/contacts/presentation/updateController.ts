import { Request, Response } from "express"
import { IContactsService } from "../domain";

export const updateController = (contactsService: IContactsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const  { contactId }  = req.params;
            const  { updates }  = req.body;
            console.log("contacts/updateController=> centerId:", contactId, "updates", updates)
            const isUpdated = await contactsService.update(contactId, updates);
            
            res.status(200).json({
                message: "Employee updated",
                data: isUpdated
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