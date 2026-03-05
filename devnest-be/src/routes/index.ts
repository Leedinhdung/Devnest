import express from "express";
import authRoutes from "@/routes/auth.route.js";
import categoriesRoutes from "@/routes/category.route.js";
const router = express.Router();
router.use("/auth", authRoutes);
router.use("/categories", categoriesRoutes);
export default router;
