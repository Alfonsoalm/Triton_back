import { Request, Response } from "express"
import { IProductsService } from "../domain";

export const getByIdController = (productsService: IProductsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const { contactId } = req.params;
            const contact = await productsService.getById(contactId);
    
            res.status(200).json({
                message: "Product obtained",
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