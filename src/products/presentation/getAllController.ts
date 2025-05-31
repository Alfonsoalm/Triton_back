import { Request, Response } from "express"
import { IProductsService } from "../domain";

export const getAllController = (productsService: IProductsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const items = await productsService.getAll();

            res.status(200).json({
                message: "Products retrieved successfully.",
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