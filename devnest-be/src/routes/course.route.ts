import {
	createCourse,
	deleteCourse,
	getCourseBySlug,
	getCourses,
	updateCourse,
} from "@/controllers/course/course.controller.js";
import { Router } from "express";

const router = Router();
router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:slug", getCourseBySlug);
router.put("/:slug", updateCourse);
router.delete("/:slug", deleteCourse);
export default router;
