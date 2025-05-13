import { Request, Response } from "express"
import { IItemsService } from "../domain";

export const updateController = (itemsService: IItemsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { itemId } = req.params;
            const { updates } = req.body;
            const isDeleted = await itemsService.update(itemId, updates);
    
            res.status(200).json({
                message: "Item updated",
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