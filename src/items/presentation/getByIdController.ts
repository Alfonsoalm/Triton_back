import { Request, Response } from "express"
import { IItemsService } from "../domain";

export const getByIdController = (itemsService: IItemsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { contactId } = req.params;
            const contact = await itemsService.getById(contactId);
    
            res.status(200).json({
                message: "Item obtained",
                data: contact
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