import express from "express";
import { getCategory, createCategory, showCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
const router = express.Router();
router.get("/", getCategory);
router.post("/", createCategory);
router.get("/:id", showCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;
//# sourceMappingURL=categoryRoutes.js.map