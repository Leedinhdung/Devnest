import {
	createLesson,
	deleteLesson,
	getLessonDetail,
	getLessons,
	reorderLessons,
	restoreLesson,
	updateLesson,
} from "@/controllers/lesson.controller.js";
import { Router } from "express";
const router = Router();

router.post("/", createLesson);
router.get("/", getLessons);
router.get("/:slug", getLessonDetail);
router.put("/:slug", updateLesson);
router.delete("/:slug", deleteLesson);
router.patch("/restore/:slug", restoreLesson);
router.patch("/reorder", reorderLessons);
export default router;
