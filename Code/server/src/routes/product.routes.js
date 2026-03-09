import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.post("/", protect, createProduct);
productRouter.get("/", protect, getProducts);
productRouter.get("/:id", protect, getProductById);
productRouter.put("/:id", protect, updateProduct);
productRouter.delete("/:id", protect, deleteProduct);

export default productRouter;
