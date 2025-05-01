import { Request, Response } from "express"
import { IItemsService } from "../domain";

export const getAllController = (itemsService: IItemsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const items = await itemsService.getAll();

            res.status(200).json({
                message: "Items retrieved successfully.",
                data: items? items.map(i => i.toJSON()): []
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