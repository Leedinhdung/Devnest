import {
	createCourseService,
	deleteCourseService,
	getCourseBySlugService,
	getCoursesService,
	updateCourseService,
} from "@/services/course.service.js";
import { courseSchema } from "@/validators/course.validator.js";
import { Request, Response } from "express";

export const createCourse = async (req: Request, res: Response) => {
	try {
		const validatedData = courseSchema.parse(req.body);

		const course = await createCourseService(validatedData);

		res.json({
			message: "Tạo khóa học thành công",
			data: course,
		});
	} catch (error) {
		res.status(400).json({
			message: "Validation failed",
		});
	}
};
export const getCourses = async (_req: Request, res: Response) => {
	try {
		const courses = await getCoursesService();

		res.json({
			data: courses,
		});
	} catch (error) {
		res.status(500).json({ message: "Get courses failed", error });
	}
};

export const getCourseBySlug = async (req: Request, res: Response) => {
	try {
		const slug = req.params.slug as string;
		const course = await getCourseBySlugService(slug);

		if (!course) {
			return res.status(404).json({
				message: "Course not found",
			});
		}

		res.json({
			data: course,
		});
	} catch (error) {
		res.status(500).json({ message: "Get course failed", error });
	}
};

export const updateCourse = async (req: Request, res: Response) => {
	try {
		const slug = req.params.slug as string;

		const course = await updateCourseService(slug, req.body);

		if (!course) {
			return res.status(404).json({
				message: "Course not found",
			});
		}

		res.json({
			message: "Cập nhật khóa học thành công",
			data: course,
		});
	} catch (error: any) {
		res.status(500).json({
			message: error.message || "Update course failed",
		});
	}
};
export const deleteCourse = async (req: Request, res: Response) => {
	try {
		const slug = req.params.slug as string;
		const course = await deleteCourseService(slug);

		if (!course) {
			return res.status(404).json({
				message: "Course not found",
			});
		}

		res.json({
			message: "Xóa khóa học thành công",
		});
	} catch (error) {
		res.status(500).json({ message: "Delete course failed", error });
	}
};
