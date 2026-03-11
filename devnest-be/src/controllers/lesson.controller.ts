import {
	createLessonService,
	deleteLessonService,
	getLessonDetailService,
	getLessonsService,
	reorderLessonService,
	restoreLessonService,
	updateLessonService,
} from "@/services/lesson.service.js";
import { Request, Response } from "express";

export const createLesson = async (req: Request, res: Response) => {
	try {
		const lesson = await createLessonService(req.body);
		res.status(201).json({
			message: "Lesson created successfully",
			data: lesson,
		});
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};
export const getLessons = async (req: Request, res: Response) => {
	try {
		const lessons = await getLessonsService();
		res.json(lessons);
	} catch (error: any) {
		res.status(500).json({
			message: error.message,
		});
	}
};
export const getLessonDetail = async (req: Request, res: Response) => {
	try {
		const slug = req.params.slug as string;
		const lesson = await getLessonDetailService(slug);
		res.json(lesson);
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};
export const updateLesson = async (req: Request, res: Response) => {
	try {
		const slug = req.params.slug as string;
		const lesson = await updateLessonService(slug, req.body);
		res.json({ message: "Lesson updated", data: lesson });
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};
export const deleteLesson = async (req: Request, res: Response) => {
	try {
		const slug = req.params.slug as string;

		await deleteLessonService(slug);

		res.json({
			message: "Lesson deleted",
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};
export const restoreLesson = async (req: Request, res: Response) => {
	try {
		const slug = req.params.slug as string;
		await restoreLessonService(slug);
		res.json({
			message: "Lesson restore success",
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};
export const reorderLessons = async (req: Request, res: Response) => {
	try {
		const lessons = req.body;
		await reorderLessonService(lessons);
		res.json({
			message: "Lessons reordered successfully",
		});
	} catch (error: any) {
		res.status(500).json({
			message: error.message,
		});
	}
};
