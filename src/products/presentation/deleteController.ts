import { Request, Response } from "express"
import { IProductsService } from "../domain";

export const deleteController = (productsService: IProductsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { itemId } = req.params;
            const isDeleted = await productsService.delete(itemId);
    
            res.status(200).json({
                message: "Product deleted",
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