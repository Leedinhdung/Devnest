import lessonModel from "@/models/lesson.model.js";
import {
	CreateLessonPayload,
	UpdateLessonPayload,
} from "@/types/lesson.type.js";
import slugify from "slugify";

export const createLessonService = async (data: CreateLessonPayload) => {
	const {
		title,
		course_id,
		section_id,
		description,
		lesson_type,
		video_url,
		content,
		duration = "",
		is_preview,
	} = data;

	const lessonCount = await lessonModel.countDocuments({ section_id });
	const lesson = await lessonModel.create({
		title,
		slug: slugify(title, { lower: true }),
		course_id,
		section_id,
		description,
		lesson_type,
		video_url,
		content,
		duration,
		is_preview,
		order_index: lessonCount + 1,
	});
	return lesson;
};
export const getLessonsService = async () => {
	return await lessonModel.find({ deleted_at: null }).sort({
		order_index: 1,
	});
};
export const getLessonDetailService = async (slug: string) => {
	const lesson = await lessonModel
		.findOne({ slug })
		.populate("course_id section_id");

	if (!lesson) {
		throw new Error("Lesson not found");
	}

	return lesson;
};
export const updateLessonService = async (
	slug: string,
	data: UpdateLessonPayload,
) => {
	const lesson = await lessonModel.findOneAndUpdate({ slug }, data, {
		returnDocument: "after",
	});

	return lesson;
};

export const deleteLessonService = async (slug: string) => {
	const lesson = await lessonModel.findOneAndUpdate(
		{ slug },
		{
			is_deleted: true,
			deleted_at: new Date(),
		},
		{ returnDocument: "after" },
	);

	if (!lesson) {
		throw new Error("Lesson not found");
	}

	return lesson;
};
export const restoreLessonService = async (slug: string) => {
	const lesson = await lessonModel.findOneAndUpdate(
		{ slug },
		{ is_deleted: false, deleted_at: null },
		{ returnDocument: "after" },
	);

	if (!lesson) {
		throw new Error("Lesson not found");
	}

	return lesson;
};

export const reorderLessonService = async (
	lessons: {
		id: string;
		order_index: number;
	}[],
) => {
	const bulkOps = lessons.map((lesson) => ({
		updateOne: {
			filter: { _id: lesson.id },
			update: { order_index: lesson.order_index },
		},
	}));
	await lessonModel.bulkWrite(bulkOps);
};
