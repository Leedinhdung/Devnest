import {
	createSection,
	deleteSection,
	getSectionById,
	getSections,
	reorderSections,
	restoreSection,
	updateSection,
} from "@/controllers/section.controller.js";
import { Router } from "express";

const router = Router();
router.post("/", createSection);
router.get("/", getSections);
router.get("/:id", getSectionById);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);
router.patch("/restore/:id", restoreSection);
router.patch("/reorder", reorderSections);

export default router;
