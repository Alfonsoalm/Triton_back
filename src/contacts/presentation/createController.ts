import { Request, Response } from "express"
import { IContactsService } from "../domain";

export const createController = (contactsService: IContactsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const data = req.body;
            console.log("data in controller",data);
            const contact = await contactsService.create(data);
            
            res.status(200).json({
                message: "Contacts created successfully.",
                data: contact ? contact : []
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
