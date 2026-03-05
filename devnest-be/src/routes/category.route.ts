import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategoryBySlug,
	restoreCategory,
	updateCategory,
} from "@/controllers/category/category.controller.js";
import { isAdmin, verifyAccessToken } from "@/middlewares/auth.middleware.js";
import express from "express";
const router = express.Router();

router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);
router.post("/", createCategory);
router.put("/:slug", updateCategory);
router.delete("/:slug", deleteCategory);
router.patch("/restore/:slug", restoreCategory);
export default router;
