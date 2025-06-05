import { Request, Response } from "express"
import { IProductsService } from "../domain";

export const createController = (productsService: IProductsService) => {
    return async(req: Request, res: Response):Promise<void> => {
        try {
            const itemData = req.body;
            console.log("itemData", itemData)
            const contact = await productsService.create(itemData);
            
            res.status(200).json({
                message: "Products created successfully.",
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
