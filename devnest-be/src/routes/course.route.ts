import {
	createCourse,
	deleteCourse,
	getCourseBySlug,
	getCourses,
	getRelatedCourses,
	updateCourse,
} from "@/controllers/course.controller.js";
import { Router } from "express";

const router = Router();
router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:slug", getCourseBySlug);
router.get("/relatedCourses/:slug", getRelatedCourses);
router.put("/:slug", updateCourse);
router.delete("/:slug", deleteCourse);
export default router;
