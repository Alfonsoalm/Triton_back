import { Request, Response } from "express";
import { IProductsService } from "../domain";

export const updateController = (productsService: IProductsService) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;
      const { updates } = req.body;
      const isDeleted = await productsService.update(productId, updates);

      res.status(200).json({
        message: "Product updated",
        data: isDeleted,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error.",
          error: error.message,
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
};
