import express from "express";
import authRoutes from "@/routes/auth.route.js";
import categoriesRoutes from "@/routes/category.route.js";
import courseRoutes from "@/routes/course.route.js";
const router = express.Router();
router.use("/auth", authRoutes);
router.use("/categories", categoriesRoutes);
router.use("/courses", courseRoutes);
export default router;
