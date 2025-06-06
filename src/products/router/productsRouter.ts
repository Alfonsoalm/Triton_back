import { Router } from "express";
import {
  createController,
  updateController,
  getAllController,
  getByIdController,
  getFieldsController,
  deleteController,
} from "../presentation";
import { productsService } from "../config/config";

const productsRouter = Router();

productsRouter.get("/", getAllController(productsService));

productsRouter.get("/fields", getFieldsController(productsService));

productsRouter.get("/:productId", getByIdController(productsService));

productsRouter.post("/", createController(productsService));

productsRouter.put("/:productId", updateController(productsService));

productsRouter.delete("/:productId", deleteController(productsService));

export { productsRouter };
