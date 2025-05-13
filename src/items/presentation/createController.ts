import { Request, Response } from "express"
import { IItemsService } from "../domain";

export const createController = (itemsService: IItemsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const itemData = req.body;
            const contact = await itemsService.create(itemData);
            
            res.status(200).json({
                message: "Items created successfully.",
                data: contact.toJSON()
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
